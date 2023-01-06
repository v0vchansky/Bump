import * as React from 'react';
import { AppState, NativeEventSubscription } from 'react-native';
import { MapMarker, Marker as RNMarker } from 'react-native-maps';
import { useDispatch } from 'react-redux';

import {
    requestUpdateUserLocation as requestUpdateUserLocationActions,
    selectMarker,
    updateLastUserLocation,
} from '~/store/map/actions';

import { MAX_ZOOM } from '../Zoomer/Zoomer';

import { createUserLocationPollingManager } from './createUserLocationPollingManager';

type AnimateCameraFn = ({
    latitude,
    longitude,
    zoom,
}: {
    latitude?: number;
    longitude?: number;
    zoom?: number;
}) => void;

interface IMarkerProps {
    userUuid: string;
    latitude: number;
    longitude: number;
    selected: boolean;
    animateCamera: AnimateCameraFn;
}

interface IAppStateManager {
    onSwitchToActive?: VoidFunction;
    onSwitchToBackground?: VoidFunction;
}

const useAppStateManager = (options: IAppStateManager) => {
    const appStateSubscription = React.useRef<NativeEventSubscription | null>(null);
    const appState = React.useRef(AppState.currentState);

    React.useEffect(() => {
        appStateSubscription.current?.remove();

        appState.current = AppState.currentState;

        appStateSubscription.current = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                options.onSwitchToActive?.();
            } else if (nextAppState.match(/inactive|background/)) {
                options.onSwitchToBackground?.();
            }

            appState.current = nextAppState;
        });
    }, [options]);

    React.useEffect(() => {
        return () => {
            appStateSubscription.current?.remove();
        };
    }, []);
};

// eslint-disable-next-line react/display-name
export const Marker = React.memo(({ userUuid, latitude, longitude, selected, animateCamera }: IMarkerProps) => {
    const dispatch = useDispatch();

    const ref = React.useRef<MapMarker | null>(null);

    const coordinates = React.useRef({ latitude, longitude });

    const requestUpdateUserLocation = React.useCallback(() => {
        dispatch(requestUpdateUserLocationActions(userUuid));
    }, []);

    const pollingManager = React.useRef(createUserLocationPollingManager({ requestUpdateUserLocation }));

    const onSwitchToActive = React.useCallback(() => {
        if (selected) {
            pollingManager.current.start();
        }
    }, [selected]);

    useAppStateManager({
        onSwitchToActive,
        onSwitchToBackground: pollingManager.current.stop,
    });

    const onMarkerPress = React.useCallback(() => {
        if (!selected) {
            dispatch(selectMarker(userUuid));
            animateCamera({ ...coordinates.current, zoom: MAX_ZOOM });
            dispatch(updateLastUserLocation(userUuid));
            pollingManager.current.start();
        }
    }, [animateCamera, dispatch, selected, userUuid]);

    React.useEffect(() => {
        if (selected) {
            pollingManager.current.start();

            return;
        }

        pollingManager.current.stop();
    }, [selected]);

    React.useEffect(() => {
        if (latitude !== coordinates.current.latitude || longitude !== coordinates.current.longitude) {
            coordinates.current = { latitude, longitude };

            if (selected) {
                animateCamera({ latitude, longitude });
            }
        }
    }, [latitude, longitude]);

    React.useEffect(() => {
        return () => {
            pollingManager.current.stop();
        };
    }, []);

    return (
        <RNMarker
            ref={ref}
            title={selected ? 'selected' : undefined}
            onPress={onMarkerPress}
            identifier={userUuid}
            coordinate={{ latitude, longitude }}
        />
    );
});
