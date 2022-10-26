import * as React from 'react';
import BackgroundGeolocation, { Subscription } from 'react-native-background-geolocation';

export const BackgroundGeolocationService: React.FC = () => {
    React.useEffect(() => {
        const onLocation: Subscription = BackgroundGeolocation.onLocation(location => {
            console.log(location);
        });

        BackgroundGeolocation.ready({
            desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            distanceFilter: 10,
        }).then(() => {
            BackgroundGeolocation.start();
        });

        return () => {
            onLocation.remove();
        };
    }, []);

    return null;
};
