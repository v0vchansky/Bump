import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { appConfig } from '../../config/app/createAppConfig';
import { dispatchRedirectToHelloPage } from '../../store/globalStore/dispatchRedirectToHelloPage';
import { baseRequest } from '../baseRequest';

export type IErrorCatcher = (error: AxiosError) => never;

export const enum InternalHttpExceptionErrorCode {
    WrongAuthCode = 'wrong_auth_code',
    WrongRefreshToken = 'wrong_refresh_token',
}

interface IAxiosResponseData {
    status: number;
    message: string;
    errorCode: InternalHttpExceptionErrorCode;
}

export const catchInternalRequest: IErrorCatcher = (error: AxiosError<IAxiosResponseData>) => {
    const status = error.response?.status;
    const data = error.response?.data;

    switch (status) {
        case 401:
            if (data?.errorCode === InternalHttpExceptionErrorCode.WrongRefreshToken) {
                dispatchRedirectToHelloPage();
            }

            break;

        case 400:
            if (data?.errorCode === InternalHttpExceptionErrorCode.WrongAuthCode) {
                console.log('show toast');
            }

            break;
    }

    throw Error();
};

export const baseInternalRequest = async <T>(
    config: AxiosRequestConfig,
    errorCatcher: IErrorCatcher = catchInternalRequest,
): Promise<T> => {
    const superConfig = {
        ...config,
        baseURL: appConfig.internalApiBaseUrl,
        headers: {
            ['Date']: new Date().toISOString(),
        },
    };

    return baseRequest<T>(superConfig)
        .catch((error: AxiosError) => errorCatcher(error))
        .then((response: AxiosResponse<T>) => {
            return response.data;
        });
};
