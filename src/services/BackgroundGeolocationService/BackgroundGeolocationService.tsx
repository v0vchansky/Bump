import * as React from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { useDispatch } from 'react-redux';

import { setGeolocation } from '~/store/geolocation/actions';

export const BackgroundGeolocationService: React.FC = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        BackgroundGeolocation.onLocation(location => {
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
        });

        BackgroundGeolocation.ready({
            desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            distanceFilter: 30,
        }).then(() => {
            BackgroundGeolocation.start();
        });
    }, [dispatch]);

    return null;
};
