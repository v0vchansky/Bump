import { StyleSheet } from 'react-native';

import { color, gap, rounded } from '../../constants';
import { TextSize } from '../Text/types';

import { IButtonProps, IButtonSize, IButtonType, IButtonWidth } from './types';

const useGetTextSize = (size?: IButtonSize): TextSize => {
    const defaultSize: TextSize = TextSize.M;

    switch (size) {
        case IButtonSize.S:
            return TextSize.S;
        case IButtonSize.M:
            return defaultSize;
        case IButtonSize.L:
            return TextSize.L;
        case IButtonSize.XL:
            return TextSize.XL;
        case IButtonSize.Auto:
        default:
            return defaultSize;
    }
};

const useGetButtonTextColor = (type?: IButtonType) => {
    const defaultColor = color.slate50;

    switch (type) {
        case IButtonType.Transparent:
        case IButtonType.TransparentBordered:
            return color.slate900;
        case IButtonType.White:
            return color.primary;
        case IButtonType.Action:
        default:
            return defaultColor;
    }
};

const useGetButtonBgColor = (type?: IButtonType) => {
    const defaultColor = color.primary;

    switch (type) {
        case IButtonType.Action:
            return defaultColor;
        case IButtonType.Transparent:
        case IButtonType.TransparentBordered:
            return color.transparent;
        case IButtonType.White:
            return color.white;
        default:
            return defaultColor;
    }
};

const useGetButtonSize = (size?: IButtonSize) => {
    const defaultSize = {
        paddingTop: gap.xs,
        paddingRight: gap.s,
        paddingBottom: gap.xs,
        paddingLeft: gap.s,
        borderRadius: rounded['5xs'],
    };

    switch (size) {
        case IButtonSize.S:
            return {
                ...defaultSize,
                height: 30,
            };
        case IButtonSize.M:
            return {
                ...defaultSize,
                height: 32,
            };
        case IButtonSize.L:
            return {
                paddingTop: 22,
                paddingRight: gap.m,
                paddingBottom: 22,
                paddingLeft: gap.m,
                borderRadius: rounded['4xs'],
                height: 64,
            };
        case IButtonSize.XL:
            return {
                paddingTop: gap.s,
                paddingRight: gap.m,
                paddingBottom: gap.s,
                paddingLeft: gap.m,
                borderRadius: rounded['4xs'],
                height: 49,
            };
        case IButtonSize.Auto:
            return {
                ...defaultSize,
            };
        default:
            return {
                ...defaultSize,
                height: 42,
            };
    }
};

export const useButtonApi = ({ size, type, width, disabled, isLoading }: IButtonProps) => {
    const textSize = useGetTextSize(size);

    const buttonTextColor = useGetButtonTextColor(type);

    const buttonBgColor = useGetButtonBgColor(type);

    const buttonSize = useGetButtonSize(size);

    const styles = StyleSheet.create({
        wrapperStyles: {
            flexDirection: 'row',
        },
        buttonStyles: {
            alignItems: 'center',
            backgroundColor: buttonBgColor,
            ...buttonSize,
            ...(width === IButtonWidth.Max
                ? {
                      flexGrow: 1,
                      alignItems: 'center',
                  }
                : {}),
            opacity: disabled || isLoading ? 0.7 : undefined,
            ...(type === IButtonType.TransparentBordered
                ? {
                      borderWidth: 2,
                      borderColor: color.slate600,
                  }
                : {}),
        },
    });

    return {
        styles,
        props: {
            buttonTextColor,
            textSize,
        },
    };
};
