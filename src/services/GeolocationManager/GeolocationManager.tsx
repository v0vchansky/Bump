import React from 'react';
import BackgroundGeolocation, { Config, Location } from 'react-native-background-geolocation';
import { useDispatch } from 'react-redux';

import { IAxiosResponseErrorData, InternalHttpExceptionErrorCode, refreshAuthLogic } from '~/api/internal/baseInternalRequest';
import { ACCESS_TOKEN_STORAGE_KEY } from '~/features/auth/store/sagas';
import { setGeolocation } from '~/store/geolocation/actions';
import EncryptedStorage from '~/utils/safeEncryptedStorage';

import { DisabledPermisionsModal } from './DisabledPermisionsModal';

const defaultConfig: Config = {
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    debug: false,
    locationAuthorizationRequest: 'Always',

    elasticityMultiplier: 1,

    startOnBoot: true,

    // IOS
    locationAuthorizationAlert: {
        titleWhenNotEnabled: 'Геолокация отключена',
        titleWhenOff: 'Геолокация отключена',
        instructions: 'Ты должен включить "Всегда" в службах определения местоположения',
        cancelButton: 'Отмена',
        settingsButton: 'Настройки',
    },
};

const enum AuthorizationStatus {
    Denied = 2,
    Always = 3,
    WhenInUse = 4,
}

type RequestPermissionFn = (
    success?: (status: AuthorizationStatus) => void,
    failure?: (status: AuthorizationStatus) => void,
) => Promise<void>;

interface IGeolocationManagerContextValue {
    enabled: boolean;
    startG: VoidFunction;
    stop: VoidFunction;
    getCurrentLocation: () => Promise<Location>;
    requestPermission: RequestPermissionFn;
    forceSendGeolocation: () => Promise<void>;
}

type GeolocationStatus = 'waiting' | 'enabled' | 'disabled';

const GeolocationManagerContext = React.createContext<IGeolocationManagerContextValue | null>(null);

export const useGeolocationManager = () => {
    const context = React.useContext(GeolocationManagerContext);

    if (!context) {
        throw new Error('GeolocationManagerContext is not provided');
    }

    return context;
};

export const GeolocationManager: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const dispatch = useDispatch();

    const [geolocationStatus, setGeolocationStatus] = React.useState<GeolocationStatus>('waiting');

    const contextValue = React.useMemo(() => {
        const controls: IGeolocationManagerContextValue = {
            get enabled() {
                return geolocationStatus === 'enabled';
            },
            startG: () => {
                if (!controls.enabled) {
                    BackgroundGeolocation.start();
                }
            },
            stop: () => {
                BackgroundGeolocation.stop();
            },
            getCurrentLocation: async () => {
                return BackgroundGeolocation.getCurrentPosition({});
            },
            requestPermission: async (success, failure) => {
                const successCb = (status: AuthorizationStatus) => {
                    if (status === AuthorizationStatus.Always) {
                        setGeolocationStatus('enabled');

                        controls.forceSendGeolocation();

                        success?.(status);
                    } else {
                        setGeolocationStatus('disabled');
                    }
                };

                const failureCb = (status: AuthorizationStatus) => {
                    setGeolocationStatus('disabled');

                    failure?.(status);
                };

                await BackgroundGeolocation.requestPermission(successCb, failureCb);
            },
            forceSendGeolocation: async () => {
                const currentLocation = await controls.getCurrentLocation();

                dispatch(
                    setGeolocation({
                        lat: currentLocation.coords.latitude,
                        lon: currentLocation.coords.longitude,
                        speed: currentLocation.coords.speed || 0,
                        localTime: new Date(),
                        batteryLevel: Math.abs(currentLocation.battery.level),
                        batteryIsCharging: currentLocation.battery.is_charging,
                    }),
                );
            },
        };

        return controls;
    }, [geolocationStatus]);

    React.useEffect(() => {
        const init = async () => {
            const accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

            BackgroundGeolocation.ready({
                ...defaultConfig,
                url: 'http://localhost:80/geolocation/set_geolocations_v2',
                method: 'POST',
                headers: {
                    ['Date']: new Date().toISOString(),
                    ['Authorization']: `Bearer ${accessToken}`,
                },
                autoSync: true,
                autoSyncThreshold: 0,
                batchSync: false,
            }, () => {
                contextValue.requestPermission(contextValue.startG);
            });

            BackgroundGeolocation.onHttp(async (res) => {
                const response = JSON.parse(res.responseText);

                console.log(res)

                if (response?.data?.errorCode === InternalHttpExceptionErrorCode.WrongAccessToken) {
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                    const data = response.data as IAxiosResponseErrorData;

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    await refreshAuthLogic({ response: { config: { headers: { ['Authorization']: true } }, status: response?.data?.statosCode, data } });

                    const accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

                    BackgroundGeolocation.setConfig({
                        url: 'http://localhost:80/geolocation/set_geolocations_v2',
                        method: 'POST',
                        headers: {
                            ['Date']: new Date().toISOString(),
                            ['Authorization']: `Bearer ${accessToken}`,
                        },
                        autoSync: true,
                        autoSyncThreshold: 1,
                        batchSync: false,
                    })
                }
            })
        }

        init();
        // BackgroundGeolocation.ready({
        //     ...defaultConfig,
        //     url: 'localhost/geolocation/set_geolocations_v2',
        //     headers: {

        //     }
        // }, () => {
        //     contextValue.requestPermission(contextValue.startG);
        // });

        // const accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

        // const config: AxiosRequestConfig = {
        //     paramsSerializer: stringify,
        //     ...superConfig,
        //     baseURL: appConfig.internalApiBaseUrl,
        //     headers: {
        //         ['Date']: new Date().toISOString(),
        //         ['Authorization']: `Bearer ${accessToken}`,
        //     },
        // };


        // BackgroundGeolocation.onLocation(location => {
        //     if (
        //         location.coords?.latitude !== undefined &&
        //         location.coords?.longitude !== undefined &&
        //         location.battery?.level !== undefined &&
        //         location.battery?.is_charging !== undefined
        //     ) {
        //         dispatch(
        //             setGeolocation({
        //                 lat: location.coords.latitude,
        //                 lon: location.coords.longitude,
        //                 speed: location.coords.speed || 0,
        //                 localTime: new Date(),
        //                 batteryLevel: Math.abs(location.battery.level),
        //                 batteryIsCharging: location.battery.is_charging,
        //             }),
        //         );
        //     }
        // });

        // BackgroundGeolocation.onMotionChange((event) => {
        //     dispatch(
        //         setGeolocation({
        //             lat: event.location.coords.latitude,
        //             lon: event.location.coords.longitude,
        //             speed: event.location.coords.speed || 0,
        //             localTime: new Date(),
        //             batteryLevel: Math.abs(event.location.battery.level),
        //             batteryIsCharging: event.location.battery.is_charging,
        //         }),
        //     );
        // });
    }, []);

    return (
        <GeolocationManagerContext.Provider value={contextValue}>
            {geolocationStatus === 'disabled' && <DisabledPermisionsModal />}
            {children}
        </GeolocationManagerContext.Provider>
    );
};
