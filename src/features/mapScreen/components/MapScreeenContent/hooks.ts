import * as React from 'react';
import MapView from 'react-native-maps';

interface IAnimateOptions {
    map: MapView | null;

    latitude?: number;
    longitude?: number;
    zoom?: number;

    minZoom?: boolean;

    duration: number;
}

type AnimationCameraManagerState = 'idle' | 'in_progress';

export const useAnimationCamera = () => {
    const timer = React.useRef<NodeJS.Timeout | null>(null);

    let state: AnimationCameraManagerState = 'idle';

    React.useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    return React.useMemo(
        () => ({
            get state() {
                return state;
            },
            animate: (animate: IAnimateOptions) => {
                if (animate.map) {
                    animate.map.getCamera().then(camera => {
                        if (!animate.map) {
                            return;
                        }

                        state = 'in_progress';

                        timer.current = setTimeout(() => {
                            state = 'idle';
                        }, animate.duration);

                        let minZoom: number | undefined;

                        if (animate.zoom && camera.zoom) {
                            minZoom = animate.zoom > camera.zoom ? animate.zoom : camera.zoom;
                        }

                        const zoom = animate.minZoom && minZoom ? minZoom : animate.zoom || camera.zoom;

                        animate.map.animateCamera(
                            {
                                ...camera,
                                center: {
                                    latitude: animate.latitude || camera.center.latitude,
                                    longitude: animate.longitude || camera.center.longitude,
                                },
                                zoom,
                            },
                            { duration: animate.duration },
                        );
                    });
                }
            },
        }),
        [],
    );
};
