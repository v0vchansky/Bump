import { Animated } from 'react-native';

export const createScaleAnimation = () => {
    const animation = new Animated.Value(1);

    return {
        increase: () => {
            Animated.timing(animation, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }).start();
        },
        decrease: (onFinish?: VoidFunction) => {
            Animated.timing(animation, {
                toValue: 0.65,
                duration: 100,
                useNativeDriver: true,
            }).start(onFinish);
        },
        get value() {
            return animation;
        },
    };
};
