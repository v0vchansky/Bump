import { StyleSheet } from 'react-native';

import { color, gap } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    root: {
        backgroundColor: color.pink50,
    },
    container: {
        paddingTop: 150,
        marginRight: gap.xxl,
        marginLeft: gap.xxl,
    },
});
