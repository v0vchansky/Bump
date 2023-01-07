import * as React from 'react';

import { GeolocationManager } from '~/services/GeolocationManager/GeolocationManager';

import { MapScreeenContent } from '../../components/MapScreeenContent/MapScreeenContent';

export const Map: React.FC = () => {
    return (
        <GeolocationManager>
            <MapScreeenContent />
        </GeolocationManager>
    );
};
