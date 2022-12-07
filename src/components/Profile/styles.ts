import { StyleSheet } from 'react-native';

import { color, gap, rounded } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    root: {},

    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    avatar: {
        width: 110,
        height: 110,
        backgroundColor: color.gray800,
        borderRadius: rounded['3xs'],
    },
    info: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    username: {
        borderWidth: 2,
        paddingRight: gap.xs,
        paddingLeft: gap.xs,
        paddingBottom: gap.xxs,
        paddingTop: gap.xxs,
        borderColor: color.slate600,
        borderRadius: rounded['5xs'],
    },
});
