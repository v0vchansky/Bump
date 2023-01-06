import * as React from 'react';
import { Dimensions, View } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import MapView, { Details, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { Screensaver } from '~/components/Screensaver/Screensaver';
import { init } from '~/store/app/actions';
import { getIsAppInited } from '~/store/app/selectors';
import { deselectMarkers, updateAllMarkers } from '~/store/map/actions';
import { getVisibleUsersMarkers } from '~/store/map/selectors';
import { haversineDistance } from '~/utils/map';

import { ControlsLayer } from '../ControlsLayer/ControlsLayer';
import { Marker } from '../Marker/Marker';
import { MAX_ZOOM, MIN_ZOOM, Zoomer } from '../Zoomer/Zoomer';

import { useAnimationCamera } from './hooks';
import { styles } from './styles';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ASPECT_RATIO = (width / height) * 100;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const initialRegion = {
    latitude: 55.755864,
    latitudeDelta: LATITUDE_DELTA,
    longitude: 37.617698,
    longitudeDelta: LONGITUDE_DELTA,
};

export const MapScreeenContent: React.FC = () => {
    const dispatch = useDispatch();

    const map = React.useRef<MapView | null>(null);

    const userMarkers = useSelector(getVisibleUsersMarkers);

    const animationCameraManager = useAnimationCamera();

    const animateCamera = React.useCallback(
        ({ latitude, longitude, zoom }: { latitude?: number; longitude?: number; zoom?: number }) => {
            animationCameraManager.animate({ latitude, longitude, zoom, duration: 250, map: map.current });
        },
        [],
    );

    const onRegionChange = React.useCallback(
        (_region: Region, details: Details) => {
            map.current?.getCamera().then(camera => {
                const selectedMarker = userMarkers.find(marker => marker.selected);

                if (selectedMarker?.geolocation) {
                    const centerMarkerDisnance = haversineDistance(
                        selectedMarker.geolocation.lat,
                        selectedMarker.geolocation.lon,
                        camera.center.latitude,
                        camera.center.longitude,
                    );

                    if (centerMarkerDisnance > 0.01 && details.isGesture) {
                        dispatch(deselectMarkers());
                    }

                    return;
                }
            });
        },
        [dispatch, userMarkers],
    );

    const selectMyLocation = React.useCallback(() => {
        BackgroundGeolocation.getCurrentPosition({}).then(location => {
            animationCameraManager.animate({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                zoom: 16,
                duration: 500,
                map: map.current,
            });
        });

        dispatch(deselectMarkers());
    }, []);

    const [mapReady, setMapReady] = React.useState(false);

    const onMapReady = React.useCallback(async () => {
        setMapReady(true);
    }, []);

    const isInited = useSelector(getIsAppInited);

    React.useEffect(() => {
        dispatch(init());
        dispatch(updateAllMarkers());
    }, []);

    return (
        <View style={styles.root}>
            {!isInited && <Screensaver />}
            <MapView
                ref={map}
                style={styles.map}
                minZoomLevel={MIN_ZOOM}
                maxZoomLevel={MAX_ZOOM}
                zoomEnabled={true}
                provider={PROVIDER_GOOGLE}
                showsIndoors={false}
                showsUserLocation={mapReady}
                rotateEnabled={false}
                initialRegion={initialRegion}
                zoomTapEnabled={false}
                onRegionChange={onRegionChange}
                onMapReady={onMapReady}
            >
                {userMarkers.map(marker => {
                    return (
                        <Marker
                            key={marker.userUuid}
                            userUuid={marker.userUuid}
                            latitude={marker.geolocation.lat}
                            longitude={marker.geolocation.lon}
                            selected={marker.selected}
                            animateCamera={animateCamera}
                        />
                    );
                })}
            </MapView>
            {map.current ? <Zoomer map={map.current} markers={userMarkers} /> : null}
            {map.current ? <Zoomer isRight map={map.current} markers={userMarkers} /> : null}
            <ControlsLayer selectMyLocation={selectMyLocation} />
        </View>
    );
};
