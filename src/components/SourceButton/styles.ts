import { StyleSheet } from 'react-native';

import { color, rounded } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        backgroundColor: color.primary,
        borderRadius: rounded['3xs'],

        shadowColor: color.primary,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,

        elevation: 13,
    },
});
