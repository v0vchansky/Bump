import { createAction } from 'typesafe-actions';

import { AddProfileInfoFormStep } from '../components/forms/AddProfileInfoForm/hooks';
import { IAuthLoginResponse, ISetProfileInfoPayload, ISubmitLoginResponse } from '../models/auth';

const prefix = 'auth';

export const login = createAction(`${prefix}/login`)<string>();
export const loginRequest = createAction(`${prefix}/login-request`)();
export const loginSuccess = createAction(`${prefix}/login-success`)<IAuthLoginResponse>();
export const loginError = createAction(`${prefix}/login-error`)();

export const submitLogin = createAction(`${prefix}/submit-login`)<string>();
export const submitLoginRequest = createAction(`${prefix}/submit-login-request`)();
export const submitLoginSuccess = createAction(`${prefix}/submit-login-success`)<
    Pick<ISubmitLoginResponse, 'accessToken' | 'refreshToken'>
>();
export const submitLoginError = createAction(`${prefix}/submit-login-error`)();

export const setAddProfileInfoFormStep = createAction(
    `${prefix}/set-add-profile-info-form-step`,
)<AddProfileInfoFormStep>();

export const setProfileInfoFormValue = createAction(`${prefix}/set-profile-info-form-value`)<string | Date>();

export const setProfileInfo = createAction(`${prefix}/set-profile-info`)<ISetProfileInfoPayload>();
export const setProfileInfoRequest = createAction(`${prefix}/set-profile-info-request`)();
export const setProfileInfoSuccess = createAction(`${prefix}/set-profile-info-success`)<AddProfileInfoFormStep>();
export const setProfileInfoError = createAction(`${prefix}/set-profile-info-error`)();

export const reset = createAction(`${prefix}/reset`)();
export const logout = createAction(`${prefix}/logout`)();
