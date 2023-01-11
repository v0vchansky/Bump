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

const minutesInterval = 1;

const calcTimingState = (createdAt: Date, updatedAt: Date) => {
    const isNowInterval = intervalToDuration({ start: new Date(updatedAt), end: new Date() });

    if (
        isNowInterval.days ||
        isNowInterval.hours ||
        isNowInterval.months ||
        isNowInterval.weeks ||
        isNowInterval.years ||
        (isNowInterval.minutes && isNowInterval.minutes > minutesInterval)
    ) {
        return {
            duration: intervalToDuration({ start: new Date(updatedAt), end: new Date() }),
            isNow: false,
        };
    } else {
        return {
            duration: intervalToDuration({ start: new Date(createdAt), end: new Date() }),
            isNow: true,
        };
    }
};

interface IBadgeState {
    duration: Duration;
    isNow: boolean;
}

// eslint-disable-next-line react/display-name
export const Marker = React.memo(
    ({ userUuid, latitude, longitude, selected, createdAt, updatedAt, speed, animateCamera }: IMarkerProps) => {
        const dispatch = useDispatch();

        const user = useSelector(getFullUserFriendByUuid(userUuid));

        const isActive = useActivity();

        const bubbleAnimation = React.useRef(createBubbleAnimation()).current;
        const scaleAnimation = React.useRef(createScaleAnimation()).current;

        const timer = React.useRef<NodeJS.Timer | null>(null);

        const [badge, setBadge] = React.useState<IBadgeState | null>(null);

        const prevCoordinates = usePrevious<LatLng>({ latitude, longitude });
        const prevSelected = usePrevious<boolean>(selected);
        const prevTiming = usePrevious({ createdAt, updatedAt });
        const prevIsActive = usePrevious(isActive);

        const anchor = React.useMemo(() => (selected ? { x: 0.5, y: 1 } : { x: 0.5, y: 0.65 }), [selected]);
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

        const setTimingState = React.useCallback(() => {
            const state = calcTimingState(createdAt, updatedAt);

            setBadge(state);

            if (selected) {
                dispatch(requestUpdateUserLocationActions(userUuid));
            }
        }, [createdAt, updatedAt, selected, userUuid, dispatch]);

        React.useEffect(() => {
            if (selected && (latitude !== prevCoordinates?.latitude || longitude !== prevCoordinates?.longitude)) {
                animateCamera({ latitude, longitude });
            }

            if (selected !== prevSelected) {
                if (selected) {
                    scaleAnimation.increase();

                    dispatch(requestUpdateUserLocationActions(userUuid));
                } else {
                    scaleAnimation.decrease();
                }
            }

            if (prevTiming?.createdAt !== createdAt || prevTiming.updatedAt !== updatedAt) {
                if (timer.current) {
                    clearInterval(timer.current);
                }

                setTimingState();

                timer.current = setInterval(setTimingState, 60000);
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
                anchor={anchor}
            >
                <Animated.View style={{ transform: [{ scale: scaleAnimation.value }] }}>
                    <View style={styles.root}>
                        {topBadge}
                        <View style={styles.markerRoot}>
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
                        </View>
                    </View>
                </Animated.View>
            </RNMarker>
        );
    },
);
