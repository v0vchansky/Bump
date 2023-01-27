import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { updateAllMarkers } from '../map/sagas';
import { getIncomingFriendRequests, getOutgoingFriendRequests, getUser } from '../user/sagas';

import * as actions from './actions';

const init = function* () {
    yield [getUser, getIncomingFriendRequests, getOutgoingFriendRequests].map(call);
    yield call(updateAllMarkers);

    yield put(actions.initSuccess());
};

export const appSaga = function* () {
    yield takeEvery(getType(actions.init), init);
};
