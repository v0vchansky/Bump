import { StyleSheet } from 'react-native';

import { color } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    searchRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        display: 'flex',
        flexDirection: 'row',

        shadowColor: color.primary,
        borderRadius: 10,
        backgroundColor: color.white,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,

        elevation: 13,
    },
});
