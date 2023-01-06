import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as geolocationsApi from '~/api/internal/geolocations';
import { ApiResponseStatus } from '~/models/apiResponse';

import { IGeolocation } from '../geolocation/models';
import { IUserRelation } from '../user/models';
import { getUserFriends } from '../user/sagas';
import { getFriendships } from '../user/selectors/me';

import * as actions from './actions';
import { IUserPosition } from './models';
import { getUserMarkerByUserUuid, getUsersMarkers } from './selectors';

const requestUpdateUserLocation = function* ({ payload }: ReturnType<typeof actions.requestUpdateUserLocation>) {
    yield call(geolocationsApi.requestUpdateUsersLocations, [payload]);
};

export const updateLastUserLocation = function* ({ payload }: ReturnType<typeof actions.updateLastUserLocation>) {
    const existedPosition: IUserPosition | undefined = yield select(getUserMarkerByUserUuid(payload));

    if (existedPosition) {
        yield put(
            actions.updateUserMarker({
                geolocation: existedPosition.geolocation,
                selected: existedPosition.selected,
                userUuid: existedPosition.userUuid,
                response: ApiResponseStatus.Loading,
            }),
        );
    } else {
        yield put(
            actions.addUserMarker({
                geolocation: undefined,
                selected: false,
                userUuid: payload,
                response: ApiResponseStatus.Loading,
            }),
        );
    }

    const updatedExistedPosition: IUserPosition = yield select(getUserMarkerByUserUuid(payload));

    try {
        const response: IGeolocation = yield call(geolocationsApi.getLastUserLocation, payload);

        yield put(
            actions.updateUserMarker({
                geolocation: {
                    ...response,
                    lat: response.lat,
                    lon: response.lon,
                },
                selected: updatedExistedPosition.selected,
                userUuid: response.userUuid,
                response: ApiResponseStatus.Ok,
            }),
        );
    } catch (e) {
        yield put(
            actions.updateUserMarker({
                geolocation: updatedExistedPosition.geolocation,
                selected: updatedExistedPosition.selected,
                userUuid: updatedExistedPosition.userUuid,
                response: ApiResponseStatus.Error,
            }),
        );
    }
};

const updateAllMarkers = function* () {
    yield call(getUserFriends);

    const friendships: IUserRelation[] = yield select(getFriendships);

    const friendsUuids = friendships.map(friendship => friendship.user.uuid);

    const existedMarkers: IUserPosition[] = yield select(getUsersMarkers);

    const existedPositionsUuids = existedMarkers.map(marker => marker.userUuid);

    for (const existedUuid of existedPositionsUuids) {
        if (!friendsUuids.includes(existedUuid)) {
            yield put(actions.deleteUserMarker(existedUuid));
        }
    }

    for (const friendUuid of friendsUuids) {
        yield fork(updateLastUserLocation, { payload: friendUuid });
    }
};

export const mapSaga = function* () {
    yield takeEvery(getType(actions.requestUpdateUserLocation), requestUpdateUserLocation);
    yield takeEvery(getType(actions.updateLastUserLocation), updateLastUserLocation);
    yield takeEvery(getType(actions.updateAllMarkers), updateAllMarkers);
};
