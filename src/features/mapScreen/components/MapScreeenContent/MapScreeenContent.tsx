import * as React from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { Screensaver } from '~/components/Screensaver/Screensaver';
import { init } from '~/store/app/actions';
import { getIsAppInited } from '~/store/app/selectors';

import { ControlsLayer } from '../ControlsLayer/ControlsLayer';
import { MapManager } from '../MapManager/MapManager';
import { Marker } from '../Marker/Marker';
import { MAX_ZOOM, MIN_ZOOM, Zoomer } from '../Zoomer/Zoomer';

import { styles } from './styles';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ASPECT_RATIO = (width / height) * 100;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const MapScreeenContent: React.FC = () => {
    const dispatch = useDispatch();

    const map = React.useRef<MapView>(null);

    const isInited = useSelector(getIsAppInited);

    React.useEffect(() => {
        dispatch(init());
    }, []);

    return (
        <View style={styles.root}>
            {!isInited && <Screensaver />}
            <MapManager>
                <MapView
                    ref={map}
                    style={styles.map}
                    minZoomLevel={MIN_ZOOM}
                    maxZoomLevel={MAX_ZOOM}
                    zoomEnabled={true}
                    provider={PROVIDER_GOOGLE}
                    showsIndoors={false}
                    initialRegion={{
                        latitude: 55.755864,
                        longitude: 37.617698,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <Marker userUuid="first" latitude={37.78825} longitude={-122.4324}></Marker>
                </MapView>
                {map.current ? <Zoomer map={map.current} /> : null}
                {map.current ? <Zoomer isRight map={map.current} /> : null}
                <ControlsLayer />
            </MapManager>
        </View>
    );
};
