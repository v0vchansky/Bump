import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { appConfig } from '../../config/app/createAppConfig';
import { dispatchredirectToAuthPage } from '../../store/globalStore/dispatchRedirectToAuth';
import { baseRequest } from '../baseRequest';

export type IErrorCatcher = (error: AxiosError) => never;

export const catchInternalRequest: IErrorCatcher = error => {
    console.log(error);
    const status = error.response?.status;

    switch (status) {
        case 401:
            dispatchredirectToAuthPage();
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
    };

    return baseRequest<T>(superConfig)
        .catch((error: AxiosError) => errorCatcher(error))
        .then((response: AxiosResponse<T>) => {
            return response.data;
        });
};
