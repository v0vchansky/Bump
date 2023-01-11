import { Animated } from 'react-native';

const initialScaleAnimValue = { x: 1, y: 0.95 };
const initialTransitionAnimValue = 0;

export const createBubbleAnimation = () => {
    let state: 'started' | 'stopped' = 'stopped';

    const scaleAnim = new Animated.ValueXY(initialScaleAnimValue);

    const transitionAnim = new Animated.Value(initialTransitionAnimValue);

    const animation = Animated.parallel([
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: {
                        x: 0.95,
                        y: 1,
                    },
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: {
                        x: 1,
                        y: 0.95,
                    },
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
        ),
        Animated.loop(
            Animated.sequence([
                Animated.timing(transitionAnim, {
                    toValue: -2.5,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(transitionAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
        ),
    ]);

    return {
        requestStart: () => {
            if (state === 'stopped') {
                animation.start(() => (state = 'stopped'));

                state = 'started';
            }
        },
        requestStop: () => {
            if (state === 'started') {
                animation.reset();
                scaleAnim.setValue(initialScaleAnimValue);
                transitionAnim.setValue(initialTransitionAnimValue);

                state = 'stopped';
            }
        },
        scaleAnim,
        transitionAnim,
    };
};
