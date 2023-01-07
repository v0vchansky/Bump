import { StyleSheet } from 'react-native';

import { gap, rounded } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    root: {
        width: '100%',
        borderRadius: rounded['2xs'],
        paddingTop: gap.m,
        paddingBottom: gap.m,
        paddingLeft: gap.l,
        paddingRight: gap.l,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
