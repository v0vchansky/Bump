import * as React from 'react';
import { Dimensions, GestureResponderEvent, View } from 'react-native';
import MapView from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';

import { color } from '~/features/ui-kit/constants';
import { calculateFocusedMarker } from '~/utils/map';

import { IMarker, useMapManager } from '../MapManager/MapManager';

import { styles } from './styles';

const createD = (X: number, Y: number, height: number) => {
    const fingerOffset = 10;
    const leftOffset = 70;
    const rightOffset = 80;

    return `
        M 0 0,
        C 0 ${Y - leftOffset},
        ${X + fingerOffset} ${Y - rightOffset},
        ${X + fingerOffset} ${Y},
        ${X + fingerOffset} ${Y + rightOffset},
        0 ${Y + leftOffset},
        0 ${height}
    `;
};

interface IZoomerProps {
    map: MapView;
    isRight?: boolean;
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const MIN_ZOOM = 2.9;
export const MAX_ZOOM = 19;

export const Zoomer: React.FC<IZoomerProps> = ({ map, isRight }) => {
    const mapManager = useMapManager();

    if (!mapManager) {
        throw new Error('MapManagerContext is not provided');
    }

    const fingerY = React.useRef(0);
    const fingerX = React.useRef(0);
    const [d, setD] = React.useState<string | undefined>(undefined);
    const focusedMarker = React.useRef<IMarker | null>(null);

    const timeout = React.useRef<number | null>(null);

    const controls = React.useMemo(() => {
        const controls = {
            onActive: async (e: GestureResponderEvent) => {
                const diff = fingerY.current - e.nativeEvent.locationY;

                fingerY.current = e.nativeEvent.locationY;
                fingerX.current = e.nativeEvent.locationX;

                const camera = await map.getCamera();

                if (camera.zoom) {
                    const directionNormalize = isRight ? -1 : 1;
                    const zoom = (diff / height) * 15 * directionNormalize;
                    const updatedZoom = camera.zoom + 1 * zoom;

                    let center = camera.center;

                    if (zoom > 0) {
                        const zoomDiff = updatedZoom - camera.zoom;

                        if (focusedMarker.current) {
                            const lonDelta = focusedMarker.current.longitude - camera.center.longitude;
                            const latDelta = focusedMarker.current.latitude - camera.center.latitude;

                            center = {
                                longitude: camera.center.longitude + lonDelta * zoomDiff,
                                latitude: camera.center.latitude + latDelta * zoomDiff,
                            };
                        }
                    } else {
                        const mapBoundaries = await map.getMapBoundaries();

                        focusedMarker.current = calculateFocusedMarker(mapBoundaries, camera, mapManager.markers);
                    }

                    setD(createD(fingerX.current, fingerY.current, height));

                    if (timeout.current) {
                        clearTimeout(timeout.current);
                    }

                    timeout.current = setTimeout(controls.onEnd, 2500);

                    if (updatedZoom < MAX_ZOOM && updatedZoom > MIN_ZOOM) {
                        map.setCamera({ zoom: updatedZoom, center });
                    }
                }
            },
            onStart: async (e: GestureResponderEvent) => {
                fingerY.current = e.nativeEvent.locationY;
                fingerX.current = e.nativeEvent.locationX;

                const camera = await map.getCamera();
                const mapBoundaries = await map.getMapBoundaries();

                focusedMarker.current = calculateFocusedMarker(mapBoundaries, camera, mapManager.markers);
            },
            onEnd: () => {
                focusedMarker.current = null;

                setD(undefined);
            },
        };

        return controls;
    }, []);

    React.useEffect(() => {
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    return (
        <View
            style={[styles.root, isRight ? styles.right : undefined]}
            onTouchEnd={controls.onEnd}
            onTouchMove={controls.onActive}
            onTouchStart={controls.onStart}
        >
            {Boolean(d) && (
                <Svg width={width} height={height}>
                    <Path d={d} strokeWidth={1} stroke="none" fill={color.gray400} fillOpacity={0.5} />
                </Svg>
            )}
        </View>
    );
};
