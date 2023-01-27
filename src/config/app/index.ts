import { IAppCommonConfig } from './types';

export const appCommonConfig: IAppCommonConfig = {
    internalApiBaseUrl: {
        production: 'https://api.bump-family.ru',
        development: 'http://127.0.0.1:80',
    },
};
