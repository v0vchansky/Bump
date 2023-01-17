import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';

import { GeolocationManager } from '~/services/GeolocationManager/GeolocationManager';

import { MapScreeenContent } from '../../components/MapScreeenContent/MapScreeenContent';

export const Map: React.FC = () => {
    React.useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <GeolocationManager>
            <MapScreeenContent />
        </GeolocationManager>
    );
};
