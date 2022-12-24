import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    root: {
        width: 30,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
    },
    right: {
        left: undefined,
        right: 0,
        transform: [
            {
                scale: -1,
            },
        ],
    },
});
