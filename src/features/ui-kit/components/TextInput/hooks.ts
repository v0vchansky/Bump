import { StyleSheet } from 'react-native';

import { color, gap, rounded } from '../../constants';
import { useGetTextSize } from '../Text/hooks';
import { TextSize } from '../Text/types';

import { ITextInputProps, ITextInputSize } from './types';

const mapTextSizeToHook = (size?: ITextInputSize): TextSize => {
    const defaultSize: TextSize = TextSize.M;

    switch (size) {
        case 's':
            return TextSize.S;
        case 'm':
            return defaultSize;
        case 'l':
            return TextSize.L;
        case 'xl':
            return TextSize.XL;
        default:
            return defaultSize;
    }
};

const useGetTextInputSize = (size?: ITextInputSize) => {
    const defaultSize = {
        paddingTop: gap.xs,
        paddingRight: gap.s,
        paddingBottom: gap.xs,
        paddingLeft: gap.s,
        borderRadius: rounded['5xs'],
    };

    switch (size) {
        case 's':
            return {
                ...defaultSize,
                height: 30,
            };
        case 'm':
            return {
                ...defaultSize,
                height: 32,
            };
        case 'l':
            return {
                paddingTop: gap.s,
                paddingRight: gap.m,
                paddingBottom: gap.s,
                paddingLeft: gap.m,
                borderRadius: rounded['4xs'],
                height: 45,
            };
        case 'xl':
            return {
                paddingTop: gap.s,
                paddingRight: gap.m,
                paddingBottom: gap.s,
                paddingLeft: gap.m,
                borderRadius: rounded['4xs'],
                height: 49,
            };
        default:
            return {
                ...defaultSize,
                height: 42,
            };
    }
};

export const useTextInputApi = ({ size }: Pick<ITextInputProps, 'size'>) => {
    const textInputSize = useGetTextInputSize(size);
    const textSize = useGetTextSize(mapTextSizeToHook(size));
    const styles = StyleSheet.create({
        root: {
            ...textInputSize,
            ...textSize,
            backgroundColor: color.slate50,
            borderColor: color.slate300,
            borderWidth: 2,
            fontFamily: `TTDaysSans-Bold`,
        },
    });

    return {
        styles,
    };
};
