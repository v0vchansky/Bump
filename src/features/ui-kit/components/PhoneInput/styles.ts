import { StyleSheet } from 'react-native';

import { color, font, fontSize as baseFontSize, rounded } from '../../constants';

const fontFamily = font.TTDaysSansRegular;
const fontSize = baseFontSize.m;
const borderRadius = rounded['4xs'];

export const styles = StyleSheet.create({
    textInputStyle: {
        fontFamily,
        borderRadius,
        ...fontSize,
    },
    textContainerStyle: {
        borderRadius,
    },
    containerStyle: {
        borderRadius,
        borderColor: color.slate200,
        borderStyle: 'solid',
        borderWidth: 2,
        height: 51,
    },
    codeTextStyle: {
        fontFamily,
    },
});
