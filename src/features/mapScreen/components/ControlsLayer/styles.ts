import { StyleSheet } from 'react-native';

import { gap } from '~/features/ui-kit/constants';

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    content: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    profileControls: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    bottomBar: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        bottom: gap.s,
        left: 0,
    },
});
