import { StyleSheet } from 'react-native';

import { color, font, fontSize } from '../../constants';
import { ConstColor } from '../../constants/types';

import { ITextProps, TextSize, TextWeight } from './types';

const useGetTextSize = (size?: TextSize) => {
    switch (size) {
        case TextSize.XS:
            return fontSize.xs;
        case TextSize.S:
            return fontSize.s;
        case TextSize.L:
            return fontSize.l;
        case TextSize.XL:
            return fontSize.xl;
        case TextSize.HelloPage:
            return fontSize.helloPage;
        case TextSize.M:
        default:
            return fontSize.m;
    }
};

const useGetFontColor = (textColor?: ConstColor) => {
    if (!textColor) {
        return color.slate900;
    }

    return textColor;
};

const useGetFontFamily = ({ weight, isItalic }: { weight?: TextWeight; isItalic?: boolean }) => {
    const localWeight = weight || TextWeight.Regular;
    const italic = isItalic ? 'Italic' : '';

    return font[`TTDaysSans${localWeight}${italic}`];
};

export const useTextApi = ({
    size,
    weight,
    isItalic,
    color,
    align: textAlign,
}: Pick<ITextProps, 'size' | 'weight' | 'isItalic' | 'color' | 'align'>) => {
    const textSize = useGetTextSize(size);

    const textColor = useGetFontColor(color);

    const fontFamily = useGetFontFamily({ weight, isItalic });

    const styles = StyleSheet.create({
        text: {
            ...textSize,
            color: textColor,
            fontFamily,
            textAlign,
        },
    });

    return {
        styles,
    };
};
