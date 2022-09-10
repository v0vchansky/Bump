import { put, takeEvery } from 'redux-saga/effects';
import type { ActionType } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { minus, operation, plus } from './actions';

const setOperation = function* ({ payload }: ActionType<typeof operation>) {
    if (payload.sign == '+') {
        yield put(plus());

        return;
    }

    yield put(minus());
};

export const testSaga = function* () {
    yield takeEvery(getType(operation), setOperation);
};
