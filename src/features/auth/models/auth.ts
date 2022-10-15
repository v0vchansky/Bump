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
}

export interface IJWTToken {
    token: string;
    endTime: Date;
}

export interface IAutnTokens {
    accessToken: IJWTToken;
    refreshToken: IJWTToken;
}
