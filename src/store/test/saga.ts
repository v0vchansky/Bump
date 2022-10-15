import { put, takeEvery } from 'redux-saga/effects';
import type { ActionType } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import * as actions from './actions';

const setOperation = function* ({ payload }: ActionType<typeof actions.operation>) {
    if (payload.sign == '+') {
        return;
    }

    yield put(actions.minus());
};

export const testSaga = function* () {
    yield takeEvery(getType(actions.operation), setOperation);
};
