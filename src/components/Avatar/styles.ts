import { StyleSheet } from 'react-native';

import { color, rounded } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    withoutAvatar: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: color.gray800,
    },
});

export const containerStyles = StyleSheet.create({
    avatarContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Стили контейнера под разные размеры Size из Props
    profile: {
        width: 110,
        height: 110,
    },
    'relations-list': {
        width: 48,
        height: 48,
    },
    map: {
        width: 70,
        height: 70,
    },
});

export const imageStyles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    profile: {
        borderRadius: rounded['xs'],
    },
    'relations-list': {
        borderRadius: rounded['3xs'],
    },
    map: {
        borderRadius: rounded['s'],
    },
});
