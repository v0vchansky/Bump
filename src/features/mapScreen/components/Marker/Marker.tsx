import * as React from 'react';
import { Animated, View } from 'react-native';
import { LatLng, Marker as RNMarker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { intervalToDuration } from 'date-fns';

import { Avatar } from '~/components/Avatar/Avatar';
import { useActivity } from '~/hooks/useActivity';
import { usePrevious } from '~/hooks/usePrevious';
import {
    requestUpdateUserLocation as requestUpdateUserLocationActions,
    selectMarker,
    updateLastUserLocation,
} from '~/store/map/actions';
import { openProfile } from '~/store/search/actions';
import { getFullUserFriendByUuid } from '~/store/user/selectors/common';

import { ActualGeolocationTimeBadge } from '../ActualGeolocationTimeBadge/ActualGeolocationTimeBadge';
import { OutdatedGeolocationTimeBadge } from '../OutdatedGeolocationTimeBadge/OutdatedGeolocationTimeBadge';
import { MAX_ZOOM } from '../Zoomer/Zoomer';

import { createBubbleAnimation } from './animations/bubble';
import { createScaleAnimation } from './animations/scale';
import { styles } from './styles';

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
    speed: number;

    createdAt: Date;
    updatedAt: Date;

    animateCamera: AnimateCameraFn;
}

const minutesInterval = 2;

const calcTimingState = (createdAt: Date, updatedAt: Date) => {
    // const isNowInterval = intervalToDuration({ start: new Date(updatedAt), end: new Date() });

    return {
        duration: intervalToDuration({ start: new Date(createdAt), end: new Date() }),
        isNow: true,
    }

    // if (
    //     isNowInterval.days ||
    //     isNowInterval.hours ||
    //     isNowInterval.months ||
    //     isNowInterval.weeks ||
    //     isNowInterval.years ||
    //     (isNowInterval.minutes && isNowInterval.minutes > minutesInterval)
    // ) {
    //     return {
    //         duration: intervalToDuration({ start: new Date(updatedAt), end: new Date() }),
    //         isNow: false,
    //     };
    // } else {
    //     return {
    //         duration: intervalToDuration({ start: new Date(createdAt), end: new Date() }),
    //         isNow: true,
    //     };
    // }
};

interface IBadgeState {
    duration: Duration;
    isNow: boolean;
}

export const Marker: React.FC<IMarkerProps> = ({
    userUuid,
    latitude,
    longitude,
    selected,
    createdAt,
    updatedAt,
    speed,
    animateCamera,
}) => {
    const dispatch = useDispatch();

    const user = useSelector(getFullUserFriendByUuid(userUuid));

    const isActive = useActivity();

    const [tracksViewChanges, setTracksViewChanges] = React.useState<boolean>(true);

    const bubbleAnimation = React.useRef(createBubbleAnimation()).current;
    const scaleAnimation = React.useRef(createScaleAnimation()).current;

    const timer = React.useRef<NodeJS.Timer | null>(null);

    const [badge, setBadge] = React.useState<IBadgeState | null>(calcTimingState(createdAt, updatedAt));

    const prevCoordinates = usePrevious<LatLng>({ latitude, longitude });
    const prevSelected = usePrevious<boolean>(selected);
    const prevTiming = usePrevious({ createdAt, updatedAt });
    const prevIsActive = usePrevious(isActive);

    const anchor = React.useMemo(() => (selected ? { x: 0.5, y: 1 } : { x: 0.5, y: 0.80 }), [selected]);
    const topBadge = React.useMemo(() => {
        if (!badge || !selected) {
            return null;
        }

        if (badge.isNow) {
            return <ActualGeolocationTimeBadge duration={badge.duration} speed={speed} />;
        }

        return <OutdatedGeolocationTimeBadge duration={badge.duration} />;
    }, [badge, selected, speed]);

    const onMarkerPress = React.useCallback(() => {
        if (prevCoordinates) {
            animateCamera({ ...prevCoordinates, zoom: MAX_ZOOM });
        }

        if (!selected) {
            dispatch(selectMarker(userUuid));
            dispatch(updateLastUserLocation(userUuid));
        } else {
            if (user) {
                dispatch(openProfile(user));
            }
        }
    }, [prevCoordinates, user, selected, userUuid, animateCamera, dispatch]);

    const startTiming = React.useCallback(() => {
        const setTimingState = () => {
            setBadge(calcTimingState(createdAt, updatedAt));
        };

        if (timer.current) {
            clearInterval(timer.current);
        }

        setTimingState();

        timer.current = setInterval(setTimingState, 60 * 1000);
    }, [createdAt, updatedAt])

    React.useEffect(() => {
        if (tracksViewChanges === true) {
            scaleAnimation.increase();
        }
    }, [tracksViewChanges]);

    React.useEffect(() => {
        if (selected && (latitude !== prevCoordinates?.latitude || longitude !== prevCoordinates?.longitude)) {
            animateCamera({ latitude, longitude });

            dispatch(requestUpdateUserLocationActions(userUuid));
        }

        if (selected !== prevSelected) {
            if (selected) {
                startTiming();
                setTracksViewChanges(true);

                dispatch(requestUpdateUserLocationActions(userUuid));
            } else {
                if (timer.current) {
                    clearInterval(timer.current);
                }

                scaleAnimation.decrease(() => {
                    setTracksViewChanges(false);
                });
            }
        }

        if (prevTiming?.createdAt !== createdAt || prevTiming.updatedAt !== updatedAt) {
            startTiming();
        }

        if (badge?.isNow) {
            bubbleAnimation.requestStart();
        } else {
            bubbleAnimation.requestStop();
        }

        if (isActive !== prevIsActive && isActive && selected) {
            dispatch(requestUpdateUserLocationActions(userUuid));
        }
    }, [
        latitude,
        longitude,
        selected,
        createdAt,
        updatedAt,
        prevCoordinates?.latitude,
        prevCoordinates?.longitude,
        prevSelected,
        prevTiming?.createdAt,
        prevTiming?.updatedAt,
        badge,
        isActive,
        prevIsActive,
    ]);

    React.useEffect(() => {
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
            }
        };
    }, []);

    if (!user) {
        return null;
    }

    return (
        <RNMarker
            onPress={onMarkerPress}
            identifier={userUuid}
            coordinate={{ latitude, longitude }}
            tracksViewChanges={tracksViewChanges}
            anchor={anchor}
            style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                {topBadge}
                <Animated.View style={{ transform: [{ scale: scaleAnimation.value }], ...styles.root }}>
                    <Animated.View
                        style={{
                            transform: [
                                { scaleY: bubbleAnimation.scaleAnim.y },
                                { scaleX: bubbleAnimation.scaleAnim.x },
                                { translateY: bubbleAnimation.transitionAnim },
                            ],
                        }}
                    >
                        <View style={styles.markerContainer}>
                            <View style={styles.avatarRoot}>
                                <Avatar size="map" avatarUrl={user.avatarUrl} displayName={user.displayName} />
                            </View>
                            <View style={styles.tail} />
                        </View>
                    </Animated.View>
                </Animated.View>
            </View>
        </RNMarker>
    );
};
