import addMinutes from 'date-fns/addMinutes';
import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { ApiResponseStatus } from '~/models/apiResponse';

import { IAuthLoginResponse, IAutnTokens } from '../models/auth';

import * as actions from './actions';

export interface IAuthState {
    tokens?: IAutnTokens;
    user?: IAuthLoginResponse;
    loginResponse: ApiResponseStatus;
    loginResponseStartTime?: Date;
    submitLoginResponse: ApiResponseStatus;
}

const initialState: IAuthState = {
    tokens: undefined,
    user: undefined,
    loginResponse: ApiResponseStatus.NotStarted,
    loginResponseStartTime: undefined,
    submitLoginResponse: ApiResponseStatus.NotStarted,
};

export const authReducer: Reducer<IAuthState, ActionType<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.loginRequest):
            return {
                ...state,
                loginResponse: ApiResponseStatus.Loading,
                loginResponseStartTime: addMinutes(new Date(), 4),
            };
        case getType(actions.loginSuccess):
            return {
                ...state,
                user: action.payload,
                loginResponse: ApiResponseStatus.Ok,
            };
        case getType(actions.loginError):
            return {
                ...state,
                loginResponse: ApiResponseStatus.Error,
            };
        case getType(actions.submitLoginSuccess):
            return {
                ...state,
                user: undefined,
                tokens: {
                    accessToken: {
                        token: action.payload.accessToken.token,
                        endTime: new Date(action.payload.accessToken.endTime),
                    },
                    refreshToken: {
                        token: action.payload.refreshToken.token,
                        endTime: new Date(action.payload.refreshToken.endTime),
                    },
                },
                loginResponse: ApiResponseStatus.NotStarted,
                submitLoginResponse: ApiResponseStatus.Ok,
            };
        case getType(actions.submitLoginRequest):
            return {
                ...state,
                submitLoginResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.submitLoginError):
            return {
                ...state,
                submitLoginResponse: ApiResponseStatus.Error,
            };
        case getType(actions.reset):
            return {
                ...initialState,
                // Оставляем значение начала отправки смс для защиты от фрода
                ...state.loginResponseStartTime,
            };
        default:
            return state;
    }
};
