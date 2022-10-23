import * as React from 'react';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

export const BackgroundGeolocationService: React.FC = () => {
    const startBackgroundService = () => {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            distanceFilter: 20,
        });

        BackgroundGeolocation.on('location', location => {
            BackgroundGeolocation.startTask(async taskKey => {
                console.log('location', new Date(), location);

                BackgroundGeolocation.endTask(taskKey);
            });
        });

        BackgroundGeolocation.start();
    };

    React.useEffect(() => {
        startBackgroundService();

        return () => {
            BackgroundGeolocation.stop();
            BackgroundGeolocation.removeAllListeners();
        };
    }, []);

    return null;
};
