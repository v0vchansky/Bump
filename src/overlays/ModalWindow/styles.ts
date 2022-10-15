import { StyleSheet } from 'react-native';

import { color } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    layout: {
        shadowColor: color.black,
        shadowOffset: {
            width: 0,
            height: 22,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
    },
    transparentBackdrop: {
        backgroundColor: color.transparent,
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
});
