import { createAction } from 'typesafe-actions';

import { IAuthLoginResponse, ISubmitLoginResponse } from '../models/auth';

const prefix = 'auth';

export const login = createAction(`${prefix}/login`)<string>();
export const loginRequest = createAction(`${prefix}/login-request`)();
export const loginSuccess = createAction(`${prefix}/login-success`)<IAuthLoginResponse>();
export const loginError = createAction(`${prefix}/login-error`)();

export const submitLogin = createAction(`${prefix}/submit-login`)<string>();
export const submitLoginRequest = createAction(`${prefix}/submit-login-request`)();
export const submitLoginSuccess = createAction(`${prefix}/submit-login-success`)<ISubmitLoginResponse>();
export const submitLoginError = createAction(`${prefix}/submit-login-error`)();

export const reset = createAction(`${prefix}/reset`)();
export const logout = createAction(`${prefix}/logout`)();
