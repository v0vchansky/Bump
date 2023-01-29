import React from 'react';
import BackgroundGeolocation, { Config, Location } from 'react-native-background-geolocation';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';

import { setGeolocation } from '~/store/geolocation/actions';
import { runAction } from '~/store/shadowActions/actions';
import { getMe } from '~/store/user/selectors/me';

import { DisabledPermisionsModal } from './DisabledPermisionsModal';

const defaultConfig: Config = {
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    debug: false,
    locationAuthorizationRequest: 'Always',

    elasticityMultiplier: 5,

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

    const userUuid = useSelector(getMe)?.uuid;

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
        let taskId: number;

        BackgroundGeolocation.ready(defaultConfig, () => {
            contextValue.requestPermission(contextValue.startG);
        });

        BackgroundGeolocation.startBackgroundTask().then((task) => {
            taskId = task;

            if (userUuid) {
                const path = `shadowActions/${userUuid}`;

                const onValueChange = database()
                    .ref(path)
                    .on('child_added', snapshot => {
                        const actionUuid = snapshot.val();

                        if (actionUuid) {
                            console.log(actionUuid)
                            dispatch(runAction(actionUuid));
                        }
                    });

                return () => database().ref(path).off('value', onValueChange);
            }
        })

        BackgroundGeolocation.onLocation(location => {
            if (
                location.coords?.latitude !== undefined &&
                location.coords?.longitude !== undefined &&
                location.battery?.level !== undefined &&
                location.battery?.is_charging !== undefined
            ) {
                // dispatch(
                //     setGeolocation({
                //         lat: location.coords.latitude,
                //         lon: location.coords.longitude,
                //         speed: location.coords.speed || 0,
                //         localTime: new Date(),
                //         batteryLevel: Math.abs(location.battery.level),
                //         batteryIsCharging: location.battery.is_charging,
                //     }),
                // );
            }
        });

        return () => {
            if (taskId) {
                BackgroundGeolocation.stopBackgroundTask(taskId);
            }
        }
    }, []);

    return (
        <GeolocationManagerContext.Provider value={contextValue}>
            {geolocationStatus === 'disabled' && <DisabledPermisionsModal />}
            {children}
        </GeolocationManagerContext.Provider>
    );
};
