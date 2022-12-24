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
        backgroundColor: color.pink50,
        zIndex: 999,
    },
    logo: {
        alignItems: 'center',
        paddingBottom: 150,
    },
    logoText: {
        marginTop: gap.xs,
    },
});
