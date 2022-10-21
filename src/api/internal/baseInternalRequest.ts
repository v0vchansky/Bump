import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { stringify } from 'query-string';

import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '~/features/auth/store/sagas';
import { dispatchLogout } from '~/store/globalStore/dispatchLogout';
import { dispatchShowToast } from '~/store/globalStore/dispatchShowToast';
import EncryptedStorage from '~/utils/safeEncryptedStorage';

import { appConfig } from '../../config/app/createAppConfig';

export type IErrorCatcher = (error: AxiosError) => Promise<never>;

export const enum InternalHttpExceptionErrorCode {
    WrongAuthCode = 'wrong_auth_code',
    WrongRefreshToken = 'wrong_refresh_token',
    WrongAccessToken = 'wrong_access_token',
}

interface IAxiosResponseErrorData {
    status: number;
    message: string;
    errorCode: InternalHttpExceptionErrorCode;
}

interface IAxiosResponseError {
    data?: IAxiosResponseErrorData;
    status: number;
}

const refreshAuthLogic = async (failedRequest: AxiosError<IAxiosResponseError>) => {
    const refreshToken = await EncryptedStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

    return axios
        .post(
            `${appConfig.internalApiBaseUrl}/auth/authentication`,
            { refreshToken },
            {
                baseURL: appConfig.internalApiBaseUrl,
                headers: {
                    ['Date']: new Date().toISOString(),
                },
            },
        )
        .then(async tokenRefreshResponse => {
            await EncryptedStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, tokenRefreshResponse.data.token);

            if (failedRequest.response?.config.headers) {
                failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;

                return Promise.resolve();
            }

            return Promise.reject();
        });
};

const api = axios.create();

createAuthRefreshInterceptor(api, refreshAuthLogic, {
    shouldRefresh: (error: AxiosError<IAxiosResponseError>) => {
        return error?.response?.data.data?.errorCode === InternalHttpExceptionErrorCode.WrongAccessToken;
    },
});

export const catchInternalRequest: IErrorCatcher = async (error: AxiosError<IAxiosResponseError>) => {
    const status = error.response?.status;
    const data = error.response?.data.data;

    switch (status) {
        case 401:
            if (data?.errorCode === InternalHttpExceptionErrorCode.WrongRefreshToken) {
                dispatchLogout();
                break;
            }

            break;
        case 400:
            if (data?.errorCode === InternalHttpExceptionErrorCode.WrongAuthCode) {
                dispatchShowToast({ type: 'error', text1: 'Неверный код' });
            }

            break;

        default:
            if (error.message === 'Network Error') {
                dispatchShowToast({ type: 'error', text1: 'Нет подключения к интернету' });
            }
    }

    return Promise.reject(error);
};

export const baseInternalRequest = async <T = unknown>(superConfig: AxiosRequestConfig): Promise<T> => {
    const accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

    const config: AxiosRequestConfig = {
        paramsSerializer: stringify,
        ...superConfig,
        baseURL: appConfig.internalApiBaseUrl,
        headers: {
            ['Date']: new Date().toISOString(),
            ['Authorization']: `Bearer ${accessToken}`,
        },
    };

    return api(config)
        .catch((error: AxiosError) => catchInternalRequest(error))
        .then((response: AxiosResponse<T>) => {
            return response.data;
        });
};
