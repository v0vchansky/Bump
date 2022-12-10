import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { getIncomingFriendRequests, getOutgoingFriendRequests, getUser, getUserFriends } from '../user/sagas';

import * as actions from './actions';

const init = function* () {
    yield call(getUserFriends);
    yield [getUser, getUserFriends, getIncomingFriendRequests, getOutgoingFriendRequests].map(call);

    yield put(actions.initSuccess());
};

export const appSaga = function* () {
    yield takeEvery(getType(actions.init), init);
};
