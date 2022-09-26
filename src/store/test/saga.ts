import { call, put, takeEvery } from 'redux-saga/effects';
import type { ActionType } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import * as authApi from '../../features/auth/api/auth';
import { IAuthLogin } from '../../features/auth/models/auth';

import * as actions from './actions';

const setOperation = function* ({ payload }: ActionType<typeof actions.operation>) {
    if (payload.sign == '+') {
        const user: IAuthLogin = yield call(authApi.login);

        yield put(actions.plus(user));

        return;
    }

    yield put(actions.minus());
};

export const testSaga = function* () {
    yield takeEvery(getType(actions.operation), setOperation);
};
