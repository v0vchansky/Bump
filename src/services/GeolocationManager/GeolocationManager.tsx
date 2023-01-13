import React from 'react';
import BackgroundGeolocation, { Config, Location } from 'react-native-background-geolocation';
import { useDispatch } from 'react-redux';

import { setGeolocation } from '~/store/geolocation/actions';

import { DisabledPermisionsModal } from './DisabledPermisionsModal';

const defaultConfig: Config = {
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    // elasticityMultiplier: 10,
    debug: false,
    locationAuthorizationRequest: 'Always',
    // distanceFilter: 30,

    elasticityMultiplier: 0.5,

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
    // const dispatch = useDispatch();

    // const [geolocationStatus, setGeolocationStatus] = React.useState<GeolocationStatus>('waiting');

    // const contextValue = React.useMemo(() => {
    //     const controls: IGeolocationManagerContextValue = {
    //         get enabled() {
    //             return geolocationStatus === 'enabled';
    //         },
    //         startG: () => {
    //             if (!controls.enabled) {
    //                 BackgroundGeolocation.start();
    //             }
    //         },
    //         stop: () => {
    //             BackgroundGeolocation.stop();
    //         },
    //         getCurrentLocation: async () => {
    //             return BackgroundGeolocation.getCurrentPosition({});
    //         },
    //         requestPermission: async (success, failure) => {
    //             const successCb = (status: AuthorizationStatus) => {
    //                 if (status === AuthorizationStatus.Always) {
    //                     setGeolocationStatus('enabled');

    //                     controls.forceSendGeolocation();

    //                     success?.(status);
    //                 }
    //             };

    //             const failureCb = (status: AuthorizationStatus) => {
    //                 setGeolocationStatus('disabled');

    //                 failure?.(status);
    //             };

    //             await BackgroundGeolocation.requestPermission(successCb, failureCb);
    //         },
    //         forceSendGeolocation: async () => {
    //             const currentLocation = await controls.getCurrentLocation();

    //             dispatch(
    //                 setGeolocation({
    //                     lat: currentLocation.coords.latitude,
    //                     lon: currentLocation.coords.longitude,
    //                     speed: currentLocation.coords.speed || 0,
    //                     localTime: new Date(),
    //                     batteryLevel: Math.abs(currentLocation.battery.level),
    //                     batteryIsCharging: currentLocation.battery.is_charging,
    //                 }),
    //             );
    //         },
    //     };

    //     return controls;
    // }, [geolocationStatus]);

    // React.useEffect(() => {
    //     BackgroundGeolocation.ready(defaultConfig, () => {
    //         contextValue.requestPermission(contextValue.startG);
    //     });

    //     BackgroundGeolocation.onLocation(location => {
    //         if (
    //             location.coords?.latitude !== undefined &&
    //             location.coords?.longitude !== undefined &&
    //             location.battery?.level !== undefined &&
    //             location.battery?.is_charging !== undefined
    //         ) {
    //             dispatch(
    //                 setGeolocation({
    //                     lat: location.coords.latitude,
    //                     lon: location.coords.longitude,
    //                     speed: location.coords.speed || 0,
    //                     localTime: new Date(),
    //                     batteryLevel: Math.abs(location.battery.level),
    //                     batteryIsCharging: location.battery.is_charging,
    //                 }),
    //             );
    //         }
    //     });
    // }, []);

    return children;

    return (
        <GeolocationManagerContext.Provider value={contextValue}>
            {geolocationStatus === 'disabled' && <DisabledPermisionsModal />}
            {children}
        </GeolocationManagerContext.Provider>
    );
};
