import * as React from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { Details, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import messaging from '@react-native-firebase/messaging';

import { Screensaver } from '~/components/Screensaver/Screensaver';
import { useAppStateManager } from '~/hooks/useAppStateManager';
import { useGeolocationManager } from '~/services/GeolocationManager/GeolocationManager';
import { init } from '~/store/app/actions';
import { getIsAppInited } from '~/store/app/selectors';
import { deselectMarkers } from '~/store/map/actions';
import { getSelectedMarker, getVisibleUsersMarkers } from '~/store/map/selectors';
import { updateDeviceToken as updateDeviceTokenAction } from '~/store/user/actions';
import { haversineDistance } from '~/utils/map';

import { ControlsLayer } from '../ControlsLayer/ControlsLayer';
import { Marker } from '../Marker/Marker';
import { MAX_ZOOM, MIN_ZOOM, Zoomer } from '../Zoomer/Zoomer';

import { customMapStyle } from './constants';
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
    const selectedMarker = useSelector(getSelectedMarker);

    const animationCameraManager = useAnimationCamera();
    const geolocationManager = useGeolocationManager();

    const updateDeviceToken = React.useCallback(async () => {
        const fcmToken = await messaging().getToken();

        if (fcmToken) {
            dispatch(updateDeviceTokenAction(fcmToken));
        }
    }, [dispatch]);

    const animateCamera = React.useCallback(
        ({ latitude, longitude, zoom }: { latitude?: number; longitude?: number; zoom?: number }) => {
            animationCameraManager.animate({ latitude, longitude, zoom, duration: 250, map: map.current });
        },
        [],
    );

    useAppStateManager({
        onForeground: () => {
            updateDeviceToken();
            geolocationManager.requestPermission(geolocationManager.startG);
        },
        onBackground: () => {
            dispatch(deselectMarkers());
        },
    });

    const onRegionChange = React.useCallback(
        (_region: Region, details: Details) => {
            map.current?.getCamera().then(camera => {
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
                }
            });
        },
        [dispatch, selectedMarker],
    );

    const selectMyLocation = React.useCallback(() => {
        geolocationManager.requestPermission(() => {
            if (geolocationManager.enabled) {
                Geolocation.getCurrentPosition(info => {
                    animationCameraManager.animate({
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                        zoom: 17,
                        minZoom: true,
                        duration: 300,
                        map: map.current,
                    });
                }, undefined, { enableHighAccuracy: true });
            }
        })
    }, [geolocationManager.enabled]);

    const [mapReady, setMapReady] = React.useState(false);

    const onMapReady = React.useCallback(async () => {
        setMapReady(true);
        selectMyLocation();
    }, []);

    const isInited = useSelector(getIsAppInited);

    React.useEffect(() => {
        updateDeviceToken();
        selectMyLocation();
    }, [geolocationManager.enabled])

    React.useEffect(() => {
        dispatch(init());
    }, []);

    return (
        <View style={styles.root}>
            {(!isInited || !mapReady) && <Screensaver />}
            <MapView
                ref={map}
                style={styles.map}
                minZoomLevel={MIN_ZOOM}
                maxZoomLevel={MAX_ZOOM}
                zoomEnabled={true}
                provider={PROVIDER_GOOGLE}
                showsIndoors={false}
                followsUserLocation={true}
                showsUserLocation={geolocationManager.enabled}
                rotateEnabled={false}
                initialRegion={initialRegion}
                zoomTapEnabled={false}
                customMapStyle={customMapStyle}
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
                            createdAt={marker.geolocation.createdAt}
                            updatedAt={marker.geolocation.updatedAt}
                            speed={marker.geolocation.speed}
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
