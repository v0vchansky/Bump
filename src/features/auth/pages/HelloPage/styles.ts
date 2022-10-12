import { StyleSheet } from 'react-native';

import { gap } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 100,
    },
    content: {
        height: '65%',
        width: '100%',
        justifyContent: 'space-between',
    },
    logo: {
        alignItems: 'center',
    },
    logoText: {
        marginTop: gap.xs,
    },
});
