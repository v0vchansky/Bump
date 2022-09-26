export interface IAppCommonConfig {
    internalApiBaseUrl: {
        production: string;
        development: string;
    };
}

export interface IAppConfig {
    internalApiBaseUrl: string;
}
