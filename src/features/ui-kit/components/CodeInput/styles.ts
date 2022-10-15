import { StyleSheet } from 'react-native';

import { color, gap, rounded } from '../../constants';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    inputContainer: {
        borderColor: color.slate200,
        borderWidth: 2,
        borderRadius: rounded['4xs'],
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 55,
        marginRight: gap.xs,
        marginLeft: gap.xs,
    },
    inputContainerFocused: {
        borderColor: color.blue600,
    },
    hiddenCodeInput: {
        position: 'absolute',
        height: 0,
        width: 0,
        opacity: 0,
    },
});
