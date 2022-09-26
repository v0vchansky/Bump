import { appCommonConfig } from '.';

const createAppConfig = () => {
    return {
        internalApiBaseUrl: __DEV__
            ? appCommonConfig.internalApiBaseUrl.development
            : appCommonConfig.internalApiBaseUrl.production,
    };
};

export const appConfig = createAppConfig();
