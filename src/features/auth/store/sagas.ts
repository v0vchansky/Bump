import { Keyboard } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import type { ActionType } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { IAxiosError, InternalHttpExceptionErrorCode } from '~/api/internal/baseInternalRequest';
import { closeByName, openByName } from '~/overlays/ModalWindow/store/actions';
import { getModalInstanceSelector } from '~/overlays/ModalWindow/store/selectors';
import { close, show } from '~/overlays/Toast/store/actions';
import { ToastType } from '~/overlays/Toast/store/types';
import { PageName } from '~/router/pageName';
import { redirectToPageWithoutHistory } from '~/store/router/actions';
import * as userActions from '~/store/user/actions';
import { IUser } from '~/store/user/models';
import { getEmptyUserProfileInfoFields, getShouldAddProfileInfo } from '~/store/user/selectors/common';
import EncryptedStorage from '~/utils/safeEncryptedStorage';

import * as authApi from '../api/auth';
import { AUTH_CODE_MODAL_NAME } from '../components/AuthCodeModal/constants';
import { AddProfileInfoFormStep } from '../components/forms/AddProfileInfoForm/hooks';
import { IAuthLoginResponse, ISubmitLoginResponse } from '../models/auth';

import * as actions from './actions';
import { getAuthUserEmail } from './selectors';

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
        yield put(show({ type: ToastType.Error, text1: 'Упс', text2: 'Что-то пошло не так...' }));
        yield put(actions.loginError());
    }
};

const submitLogin = function* ({ payload: code }: ActionType<typeof actions.submitLogin>) {
    yield put(actions.submitLoginRequest());

    const email: string | undefined = yield select(getAuthUserEmail);

    try {
        if (email) {
            const { refreshToken, accessToken, user }: ISubmitLoginResponse = yield call(authApi.submitLogin, {
                code,
                email,
            });

            yield put(actions.submitLoginSuccess({ refreshToken, accessToken }));
            yield put(userActions.init(user));
            yield call(EncryptedStorage.setItem, REFRESH_TOKEN_STORAGE_KEY, refreshToken.token);
            yield call(EncryptedStorage.setItem, ACCESS_TOKEN_STORAGE_KEY, accessToken.token);
            yield put(closeByName(AUTH_CODE_MODAL_NAME));
            Keyboard.dismiss();
            yield put(close());

            const shouldAddProfileInfo: boolean = yield select(getShouldAddProfileInfo);

            if (shouldAddProfileInfo) {
                yield put(redirectToPageWithoutHistory(PageName.AddProfileInfo));

                return;
            }

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
    yield put(userActions.reset());
    yield put(redirectToPageWithoutHistory(PageName.HelloPage));
};

const setProfileInfo = function* ({ payload }: ActionType<typeof actions.setProfileInfo>) {
    yield put(actions.setProfileInfoRequest());
    const userInfo: Pick<IUser, 'displayName' | 'userName' | 'birthday'> = yield select(getEmptyUserProfileInfoFields);

    try {
        yield call(authApi.setProfileInfo, payload);

        const step = payload.fieldName;

        Keyboard.dismiss();

        if (step === AddProfileInfoFormStep.DisplayName) {
            if (userInfo.userName) {
                if (userInfo.birthday) {
                    yield put(redirectToPageWithoutHistory(PageName.Map));
                } else {
                    yield put(
                        userActions.setUserProfileInfo({ fieldName: payload.fieldName, value: payload.fieldValue }),
                    );
                    yield put(actions.setProfileInfoSuccess(AddProfileInfoFormStep.Birthday));
                }
            } else {
                yield put(userActions.setUserProfileInfo({ fieldName: payload.fieldName, value: payload.fieldValue }));
                yield put(actions.setProfileInfoSuccess(AddProfileInfoFormStep.UserName));
            }
        } else if (step === AddProfileInfoFormStep.UserName) {
            if (userInfo.birthday) {
                yield put(redirectToPageWithoutHistory(PageName.Map));
            } else {
                yield put(userActions.setUserProfileInfo({ fieldName: payload.fieldName, value: payload.fieldValue }));
                yield put(actions.setProfileInfoSuccess(AddProfileInfoFormStep.Birthday));
            }
        } else if (step === AddProfileInfoFormStep.Birthday) {
            yield put(userActions.setUserProfileInfo({ fieldName: payload.fieldName, value: payload.fieldValue }));
            yield put(redirectToPageWithoutHistory(PageName.Map));
        } else {
            yield put(redirectToPageWithoutHistory(PageName.Map));
        }
    } catch (e: unknown) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const errorData = e as IAxiosError;

        if (errorData.response?.data?.data?.errorCode === InternalHttpExceptionErrorCode.NonUnique) {
            yield put(
                show({
                    type: ToastType.Error,
                    text1: 'Упс...',
                    text2: 'Этот ник уже занят 😔',
                }),
            );
        }

        yield put(actions.setProfileInfoError());
    }
};

export const authSaga = function* () {
    yield takeEvery(getType(actions.login), login);
    yield takeEvery(getType(actions.submitLogin), submitLogin);
    yield takeEvery(getType(actions.logout), logout);
    yield takeEvery(getType(actions.setProfileInfo), setProfileInfo);
};
