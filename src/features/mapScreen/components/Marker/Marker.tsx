import * as React from 'react';
import { Marker as RNMarker } from 'react-native-maps';

import { useMapManager } from '../MapManager/MapManager';

interface IMarkerProps {
    userUuid: string;
    latitude: number;
    longitude: number;
}

export const Marker: React.FC<IMarkerProps> = ({ userUuid, latitude, longitude }) => {
    const mapManager = useMapManager();

    if (!mapManager) {
        throw new Error('MapManagerContext is not provided');
    }

    React.useEffect(() => {
        mapManager.createMarker({ id: userUuid, latitude, longitude });

        return () => {
            mapManager.deleteMarker(userUuid);
        };
    }, []);

    return (
        <RNMarker
            key="first2"
            identifier="first"
            coordinate={{
                latitude: latitude,
                longitude: longitude,
            }}
        />
    );
};
