import * as React from 'react';

export interface IMarker {
    id: string;
    latitude: number;
    longitude: number;
}

interface IMapManagerContext {
    createMarker: (marker: IMarker) => void;
    deleteMarker: (markerId: string) => void;
    getMarker: (markerId: string) => IMarker | undefined;
    markers: IMarker[];
}

const MapManagerContext = React.createContext<IMapManagerContext | null>(null);

export const useMapManager = () => React.useContext(MapManagerContext);

export const MapManager: React.FC<{ children: Array<JSX.Element | null> }> = ({ children }) => {
    const [markers, setMarkers] = React.useState<IMarker[]>([]);

    const contextValue: IMapManagerContext = React.useMemo(
        () => ({
            get markers() {
                return markers;
            },
            getMarker: (markerId: string) => {
                return markers.find(marker => marker.id === markerId);
            },
            createMarker: (marker: IMarker) => {
                setMarkers(prevMarkers => {
                    return [...prevMarkers, marker];
                });
            },
            deleteMarker: (markerId: string) => {
                setMarkers(prevMarkers => {
                    return prevMarkers.filter(marker => marker.id !== markerId);
                });
            },
        }),
        [markers],
    );

    return <MapManagerContext.Provider value={contextValue}>{children}</MapManagerContext.Provider>;
};
