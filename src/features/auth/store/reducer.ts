import addMinutes from 'date-fns/addMinutes';
import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { ApiResponseStatus } from '~/models/apiResponse';

import { AddProfileInfoFormStep } from '../components/forms/AddProfileInfoForm/hooks';
import { IAuthLoginResponse } from '../models/auth';

import * as actions from './actions';

export interface IAuthState {
    isAuthorized: boolean;
    user?: IAuthLoginResponse;
    loginResponse: ApiResponseStatus;
    loginResponseStartTime?: Date;
    submitLoginResponse: ApiResponseStatus;

    profileInfoFormStep: AddProfileInfoFormStep | null;
    setProfileInfoFormStepResponse: ApiResponseStatus;
    setProfileInfoFormValue: string | Date;
}

const initialState: IAuthState = {
    isAuthorized: false,
    user: undefined,
    loginResponse: ApiResponseStatus.NotStarted,
    loginResponseStartTime: undefined,
    submitLoginResponse: ApiResponseStatus.NotStarted,

    profileInfoFormStep: null,
    setProfileInfoFormStepResponse: ApiResponseStatus.NotStarted,
    setProfileInfoFormValue: '',
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
        case getType(actions.submitLoginRequest):
            return {
                ...state,
                submitLoginResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.submitLoginSuccess):
            return {
                ...state,
                user: undefined,
                isAuthorized: true,
                loginResponse: ApiResponseStatus.NotStarted,
                submitLoginResponse: ApiResponseStatus.Ok,
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

        case getType(actions.setProfileInfoFormValue):
            return {
                ...state,
                setProfileInfoFormValue: action.payload,
            };
        case getType(actions.setAddProfileInfoFormStep):
            return {
                ...state,
                profileInfoFormStep: action.payload,
                setProfileInfoFormValue: '',
            };
        case getType(actions.setProfileInfoRequest):
            return {
                ...state,
                setProfileInfoFormStepResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.setProfileInfoSuccess):
            return {
                ...state,
                profileInfoFormStep: action.payload,
                setProfileInfoFormStepResponse: ApiResponseStatus.Ok,
                setProfileInfoFormValue: '',
            };
        case getType(actions.setProfileInfoError):
            return {
                ...state,
                setProfileInfoFormStepResponse: ApiResponseStatus.Error,
            };
        default:
            return state;
    }
};
