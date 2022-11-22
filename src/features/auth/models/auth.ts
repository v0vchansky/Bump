import { IUser } from '~/store/user/models';

import { AddProfileInfoFormStep } from '../components/forms/AddProfileInfoForm/hooks';

export interface IAuthLoginResponse {
    phone: string;
}

export interface ISubmitLoginParams {
    phone: string;
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
