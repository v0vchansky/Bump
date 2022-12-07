import { StyleSheet } from 'react-native';

import { color, rounded } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    listRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowAvatar: {
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.gray800,
        borderRadius: rounded['5xs'],
    },
    desc: {
        display: 'flex',
        width: 180,
    },
});
