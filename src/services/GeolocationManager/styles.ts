import { StyleSheet } from 'react-native';

import { gap } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 999,
    },
    image: {
        width: 270,
        height: 270,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        marginRight: 30,
        marginLeft: 30,
    },
    content: {
        width: '100%',
        height: '50%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer: {
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
        paddingLeft: gap.xl,
        paddingRight: gap.xl,
        marginTop: gap.xxxl,
    },
});
