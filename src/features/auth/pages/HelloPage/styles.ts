import { StyleSheet } from 'react-native';

import { color, gap } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    root: {
        backgroundColor: color.pink50,
    },
    container: {
        height: '100%',
        justifyContent: 'flex-end',
        marginRight: gap.xxl,
        marginLeft: gap.xxl,
    },
    content: {
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    logo: {
        alignItems: 'center',
    },
    logoText: {
        marginTop: gap.xs,
    },
});
