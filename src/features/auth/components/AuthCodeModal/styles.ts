import { StyleSheet } from 'react-native';

import { color, gap, rounded } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    modalTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    badge: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: gap.m,
        backgroundColor: color.amber300,
        borderRadius: rounded['3xs'],
    },
});
