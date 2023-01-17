import { StyleSheet } from 'react-native';

import { color } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: color.white,
        zIndex: 999,
    },
    image: {
        width: 260,
        height: 260,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        marginRight: 30,
        marginLeft: 30,
    },
    content: {
        height: '50%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
