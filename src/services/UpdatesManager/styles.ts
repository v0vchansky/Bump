import { StyleSheet } from 'react-native';

import { color, gap } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 999,
        backgroundColor: color.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '100%',
    },
    texts: { display: 'flex', alignItems: 'center', marginTop: gap.xxxl },
    button: { position: 'absolute', bottom: gap.l, width: '100%' },
    image: { width: 250, height: 250, resizeMode: 'contain' },
});
