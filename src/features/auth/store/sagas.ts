import { call, put, select, takeEvery } from 'redux-saga/effects';
import type { ActionType } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { closeByName, openByName } from '~/overlays/ModalWindow/store/actions';
import { PageName } from '~/router/pageName';
import { redirectToPageWithoutHistory } from '~/store/router/actions';

import * as authApi from '../api/auth';
import { AUTH_CODE_MODAL_NAME } from '../components/AuthCodeModal/constants';
import { IAuthLoginResponse, ISubmitLoginResponse } from '../models/auth';

import * as actions from './actions';
import { getAuthUserPhone } from './selectors';

const login = function* ({ payload }: ActionType<typeof actions.login>) {
    yield put(actions.loginRequest());

    try {
        const response: IAuthLoginResponse = yield call(authApi.login, payload);

        yield put(openByName(AUTH_CODE_MODAL_NAME));

        yield put(actions.loginSuccess(response));
    } catch (e) {
        console.log(e);
    }
};

const submitLogin = function* ({ payload: code }: ActionType<typeof actions.submitLogin>) {
    yield put(actions.submitLoginRequest());

    const phone: string | undefined = yield select(getAuthUserPhone);

    try {
        if (phone) {
            const response: ISubmitLoginResponse = yield call(authApi.submitLogin, { code, phone });

            yield put(actions.submitLoginSuccess(response));
            yield put(closeByName(AUTH_CODE_MODAL_NAME));
            yield put(redirectToPageWithoutHistory(PageName.Map));
        }
    } catch (e) {
        console.log(e);
    }
};

const logout = function* () {
    yield put(actions.reset());
    yield put(redirectToPageWithoutHistory(PageName.HelloPage));
};

export const authSaga = function* () {
    yield takeEvery(getType(actions.login), login);
    yield takeEvery(getType(actions.submitLogin), submitLogin);
    yield takeEvery(getType(actions.logout), logout);
};
