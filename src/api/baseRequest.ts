import type { AxiosPromise, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { stringify } from 'query-string';

const api = axios.create();

export const baseRequest = <T = unknown>(superConfig: AxiosRequestConfig): AxiosPromise<T> => {
    const config: AxiosRequestConfig = {
        paramsSerializer: stringify,
        ...superConfig,
    };

    return api(config);
};
