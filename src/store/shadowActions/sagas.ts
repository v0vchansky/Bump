import BackgroundGeolocation from 'react-native-background-geolocation';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as api from '~/api/internal/shadowActions';

import { forcePushCurrentGeolocationsOnServer } from '../geolocation/saga';
import { updateAllMarkers, updateLastUserLocation } from '../map/sagas';
import { clearRelatinById } from '../user/actions';

import * as actions from './actions';
import {
    IForceGetLastUserLocationPayload,
    IForceUpdateUserFriendsPayload,
    IShadowAction,
    ShadowAction,
} from './models';

const runAction = function* ({ payload: actionId }: ReturnType<typeof actions.runAction>) {
    try {
        const action: IShadowAction = yield call(api.getAction, actionId);

        console.log('action', action);

        switch (action.type) {
            case ShadowAction.ForceSendGeolocaton:
                // console.log('forcePushCurrentGeolocationsOnServer');
                // yield call(forcePushCurrentGeolocationsOnServer);
                BackgroundGeolocation.getCurrentPosition,
                    {
                        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
                    };
                break;
            case ShadowAction.ForceGetLastUserLocation:
                // eslint-disable-next-line no-case-declarations, @typescript-eslint/consistent-type-assertions
                const payload = action.payload as IForceGetLastUserLocationPayload;

                // console.log('ForceGetLastUserLocation');
                yield call(updateLastUserLocation, { payload: payload.userUuid });
                break;
            case ShadowAction.ForceUpdateUserFriends:
                // eslint-disable-next-line no-case-declarations, @typescript-eslint/consistent-type-assertions
                const forceFriendsUpdatePayload = action.payload as IForceUpdateUserFriendsPayload;

                yield put(clearRelatinById(forceFriendsUpdatePayload.deletedUserUuid));

                yield call(updateAllMarkers);
                break;
        }

        yield call(api.resolveAction, action.uuid);
    } catch (e) {
        try {
            yield call(api.resolveAction, actionId);
        } catch (_e) {
            //
        }
    }
};

export const shadowActionsSaga = function* () {
    yield takeEvery(getType(actions.runAction), runAction);
};
