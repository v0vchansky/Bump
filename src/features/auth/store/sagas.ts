import Toast from 'react-native-toast-message';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import type { ActionType } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { closeByName, openByName } from '~/overlays/ModalWindow/store/actions';
import { getModalInstanceSelector } from '~/overlays/ModalWindow/store/selectors';
import { PageName } from '~/router/pageName';
import { redirectToPageWithoutHistory } from '~/store/router/actions';
import EncryptedStorage from '~/utils/safeEncryptedStorage';

import * as authApi from '../api/auth';
import { AUTH_CODE_MODAL_NAME } from '../components/AuthCodeModal/constants';
import { IAuthLoginResponse, ISubmitLoginResponse } from '../models/auth';

import * as actions from './actions';
import { getAuthUserPhone } from './selectors';

export const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
export const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

const login = function* ({ payload }: ActionType<typeof actions.login>) {
    yield put(actions.loginRequest());

    try {
        const response: IAuthLoginResponse = yield call(authApi.login, payload);

        const modal: BottomSheetModalMethods | null = yield select(getModalInstanceSelector(AUTH_CODE_MODAL_NAME));

        modal?.snapToIndex(1);

        yield put(openByName(AUTH_CODE_MODAL_NAME));

        yield put(actions.loginSuccess(response));
    } catch (e) {
        Toast.show({ type: 'success', text1: 'Упс', text2: 'Что-то пошло не так, попробуйте позже' });
        yield put(actions.loginError());
    }
};

const submitLogin = function* ({ payload: code }: ActionType<typeof actions.submitLogin>) {
    yield put(actions.submitLoginRequest());

    const phone: string | undefined = yield select(getAuthUserPhone);

    try {
        if (phone) {
            const response: ISubmitLoginResponse = yield call(authApi.submitLogin, { code, phone });

            yield put(actions.submitLoginSuccess(response));
            yield call(EncryptedStorage.setItem, REFRESH_TOKEN_STORAGE_KEY, response.refreshToken.token);
            yield call(EncryptedStorage.setItem, ACCESS_TOKEN_STORAGE_KEY, response.accessToken.token);
            yield put(closeByName(AUTH_CODE_MODAL_NAME));
            yield put(redirectToPageWithoutHistory(PageName.Map));
        }
    } catch (e) {
        yield put(actions.submitLoginError());
    }
};

const logout = function* () {
    yield call(EncryptedStorage.removeItem, REFRESH_TOKEN_STORAGE_KEY);
    yield call(EncryptedStorage.removeItem, ACCESS_TOKEN_STORAGE_KEY);
    yield put(actions.reset());
    yield put(redirectToPageWithoutHistory(PageName.HelloPage));
};

export const authSaga = function* () {
    yield takeEvery(getType(actions.login), login);
    yield takeEvery(getType(actions.submitLogin), submitLogin);
    yield takeEvery(getType(actions.logout), logout);
};
