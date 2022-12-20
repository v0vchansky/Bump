import { call, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as api from '~/api/internal/shadowActions';

import { forcePushCurrentGeolocationsOnServer } from '../geolocation/saga';

import * as actions from './actions';
import { IShadowAction, ShadowAction } from './models';

const runAction = function* ({ payload: actionId }: ReturnType<typeof actions.runAction>) {
    try {
        const action: IShadowAction = yield call(api.getAction, actionId);

        switch (action.type) {
            case ShadowAction.ForcePushGeolocation:
                yield call(forcePushCurrentGeolocationsOnServer);
                break;
        }

        yield call(api.resolveAction, action.uuid);
    } catch (e) {
        yield call(api.resolveAction, actionId);
    }
};

export const shadowActionsSaga = function* () {
    yield takeEvery(getType(actions.runAction), runAction);
};
