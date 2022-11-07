import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as geolocationsApi from '~/api/internal/geolocations';

import * as actions from './actions';
import { IGeolocation } from './models';
import { getFirstGeolocationPoints, getGeopointsAmount, getShouldSetGeolocationsOnServer } from './selectors';

export const SET_GEOLOCATIONS_CHUNK_SIZE = 100;

const sendGeopoints = function* () {
    yield put(actions.setGeolocationRequest());

    try {
        const points: IGeolocation[] = yield select(getFirstGeolocationPoints(SET_GEOLOCATIONS_CHUNK_SIZE));

        yield call(geolocationsApi.setGeolocationsOnServer, points);

        yield put(actions.setGeolocationSuccess());
    } catch (_e) {
        yield put(actions.setGeolocationError());
    }
};

const setGeolocation = function* ({ payload }: ReturnType<typeof actions.setGeolocation>) {
    yield put(actions.addNewGeolocationPoint(payload));
    const shouldSetGeolocationsOnServer: boolean = yield select(getShouldSetGeolocationsOnServer);
    const geopointsAmount: number = yield select(getGeopointsAmount);

    if (shouldSetGeolocationsOnServer) {
        // Отправляем чанками по 100 штук (SET_GEOLOCATIONS_CHUNK_SIZE)
        for (let i = 0; i < Math.ceil(geopointsAmount / SET_GEOLOCATIONS_CHUNK_SIZE); i++) {
            yield call(sendGeopoints);
        }
    }
};

export const geolocationSaga = function* () {
    yield takeEvery(getType(actions.setGeolocation), setGeolocation);
};
