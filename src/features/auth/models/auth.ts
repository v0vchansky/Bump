import { IUser } from '~/store/user/models';

import { AddProfileInfoFormStep } from '../components/forms/AddProfileInfoForm/hooks';

export interface IAuthLoginResponse {
    email: string;
}

export interface ISubmitLoginParams {
    email: string;
    code: string;
}

export interface IJWTTokenReponse {
    token: string;
    endTime: string;
}

export interface ISubmitLoginResponse {
    accessToken: IJWTTokenReponse;
    refreshToken: IJWTTokenReponse;
    user: IUser;
}

export interface ISetProfileInfoPayload {
    fieldName: AddProfileInfoFormStep;
    fieldValue: string | Date;
}
