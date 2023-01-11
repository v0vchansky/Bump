import { StyleSheet } from 'react-native';

import { color, gap, rounded } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    root: {
        backgroundColor: color.zinc500,
        zIndex: 2,
        marginBottom: 6,
        alignItems: 'center',
        paddingRight: gap.xxs,
        paddingLeft: gap.xxs,
        paddingTop: gap.xxs,
        paddingBottom: gap.xxs,
        borderRadius: rounded['6xs'],
        flexDirection: 'row',
    },
    iconRoot: {
        width: 20,
        height: 20,
        borderRadius: rounded['7xs'],
        backgroundColor: color.zinc600,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: gap.xxs,
    },
});
