import * as React from 'react';
import BackgroundGeolocation, { Config } from 'react-native-background-geolocation';
import { useDispatch } from 'react-redux';

import { setGeolocation } from '~/store/geolocation/actions';

const time = 0.5;

const getDistanceFilter = (speed: number) => {
    if (speed === 0) {
        return 10;
    }

    return speed * time * 60;
};

const defaultConfig: Config = {
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 30,
    debug: false,
};

export const BackgroundGeolocationService: React.FC = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        BackgroundGeolocation.onLocation(location => {
            if (
                location.coords?.latitude !== undefined &&
                location.coords?.longitude !== undefined &&
                location.battery?.level !== undefined &&
                location.battery?.is_charging !== undefined
            ) {
                dispatch(
                    setGeolocation({
                        lat: location.coords.latitude,
                        lon: location.coords.longitude,
                        speed: location.coords.speed || 0,
                        localTime: new Date(),
                        batteryLevel: Math.abs(location.battery.level),
                        batteryIsCharging: location.battery.is_charging,
                    }),
                );

                const newDistanceFilter = getDistanceFilter(location.coords.speed || 0);

                console.log('newDistanceFilter', newDistanceFilter, (location.coords.speed || 0) * 3.6);

                BackgroundGeolocation.setConfig({
                    ...defaultConfig,
                    distanceFilter: newDistanceFilter,
                });
            }
        });

        BackgroundGeolocation.onActivityChange(event => {
            console.log('[onActivityChange] ', event);
        });

        BackgroundGeolocation.onMotionChange(event => {
            if (event.isMoving) {
                console.log('[onMotionChange] Device has just started MOVING ', event.location);
            } else {
                console.log('[onMotionChange] Device has just STOPPED:  ', event.location);
            }
        });

        BackgroundGeolocation.ready(defaultConfig).then(() => {
            BackgroundGeolocation.start();
        });
    }, []);

    return null;
};
