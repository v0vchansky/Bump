import { StyleSheet } from 'react-native';

import { color, rounded } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    root: {
        width: 70 + 8 + 70,
        height: 70 + 8 + 14 + 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    markerContainer: {
        backgroundColor: color.white,
        padding: 2,
        borderRadius: rounded['m'],
        borderColor: color.slate500,
        borderWidth: 2,
    },
    markerRoot: {
        height: 70 + 8 + 14,
        width: 70 + 8,
    },
    avatarRoot: {
        zIndex: 1,
    },
    tail: {
        width: 20,
        height: 20,
        backgroundColor: color.white,
        borderColor: color.slate700,
        borderWidth: 1,
        borderLeftColor: color.transparent,
        borderTopColor: color.transparent,
        position: 'absolute',
        borderBottomEndRadius: rounded['7xs'],
        transform: [{ rotate: '45deg' }],
        bottom: -10,
        left: 27.5,
    },
});
