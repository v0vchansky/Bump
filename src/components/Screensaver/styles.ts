import { StyleSheet } from 'react-native';

import { color, gap } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: color.primary,
        zIndex: 999,
    },
    content: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 240,
        height: 100,
        resizeMode: 'contain',
        marginTop: gap['8xl'] * 2.2,
    },
});
