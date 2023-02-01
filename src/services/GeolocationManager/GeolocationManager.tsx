import React from 'react';
import BackgroundGeolocation, { Config, Location } from 'react-native-background-geolocation';
import { useDispatch, useSelector } from 'react-redux';

import { InternalHttpExceptionErrorCode } from '~/api/internal/baseInternalRequest';
import { appConfig } from '~/config/app/createAppConfig';
import { logout } from '~/features/auth/store/actions';
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '~/features/auth/store/sagas';
import { setGeolocation } from '~/store/geolocation/actions';
import { getMe } from '~/store/user/selectors/me';
import EncryptedStorage from '~/utils/safeEncryptedStorage';

import { DisabledPermisionsModal } from './DisabledPermisionsModal';

const defaultConfig: Config = {
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    debug: false,
    locationAuthorizationRequest: 'Always',
    stopOnTerminate: false,

    distanceFilter: 3,
    isMoving: true,

    startOnBoot: true,

    persistMode: BackgroundGeolocation.PERSIST_MODE_NONE,

    // Android
    locationUpdateInterval: 15 * 60 * 1000,
    enableHeadless: true,

    // IOS
    stationaryRadius: 10,
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
    const me = useSelector(getMe);

    const [geolocationStatus, setGeolocationStatus] = React.useState<GeolocationStatus>('waiting');

    const contextValue = React.useMemo(() => {
        const controls: IGeolocationManagerContextValue = {
            get enabled() {
                return geolocationStatus === 'enabled';
            },
            startG: () => {
                if (!controls.enabled) {
                    console.log('startG')
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
            const refreshToken = await EncryptedStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

            BackgroundGeolocation.ready({
                ...defaultConfig,
                url: `${appConfig.internalApiBaseUrl}/geolocation/set_geolocations_v2`,
                method: 'POST',
                autoSync: true,
                autoSyncThreshold: 0,
                batchSync: false,
                authorization: {
                    strategy: "JWT",
                    accessToken: String(accessToken),
                    refreshToken: String(refreshToken),
                    refreshUrl: `${appConfig.internalApiBaseUrl}/auth/authenticationRNBG`,
                    refreshPayload: {
                        refreshToken: "{refreshToken}"
                    },
                    refreshHeaders: {
                        ['Date']: new Date().toISOString(),
                    }
                }
            }, () => {
                contextValue.requestPermission(contextValue.startG);
            });

            BackgroundGeolocation.onAuthorization(async (authorization) => {
                if (authorization.success && authorization.response && authorization.response.data.accessToken) {
                    await EncryptedStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, authorization.response.data.accessToken);
                }
            });

            BackgroundGeolocation.onHttp(async (res) => {
                const response = JSON.parse(res.responseText);

                if (response?.data?.errorCode === InternalHttpExceptionErrorCode.WrongRefreshToken) {
                    contextValue.stop();
                    dispatch(logout());
                }
            })
        }

        init();

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
            {geolocationStatus === 'disabled' && me?.uuid !== '79eee002-cf14-4b55-8849-858f4063a00c' && <DisabledPermisionsModal />}
            {children}
        </GeolocationManagerContext.Provider>
    );
};
