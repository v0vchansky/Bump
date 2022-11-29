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
        backgroundColor: color.gray800,
        borderRadius: rounded['3xs'],
    },
});
