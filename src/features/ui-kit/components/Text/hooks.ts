import { ITextColor, ITextProps, ITextSize, ITextWeight } from './types';

const useGetTextSizeClass = (size?: ITextSize): string => {
    const defaultSize = 'text-lg';

    switch (size) {
        case ITextSize.S:
            return 'text-sm';
        case ITextSize.M:
            return 'text-base';
        case ITextSize.L:
            return defaultSize;
        case ITextSize.XL:
            return 'text-xl';
        case ITextSize.XXL:
            return 'text-2xl';
        default:
            return defaultSize;
    }
};

const useGetFontFamily = ({ weight, isItalic }: Pick<ITextProps, 'isItalic' | 'weight'>): string => {
    // return `font-[TTDaysSans-BlackItalic]`;

    if (weight === ITextWeight.Regular && isItalic) {
        // return 'font-[TTDaysSans-Italic]';
    }

    return '';

    return `font-[TTDaysSans-${weight || ITextWeight.Regular}${isItalic ? 'Italic' : ''}]`;
};

const useGetFontColor = (color?: ITextColor): ITextColor => {
    if (!color) {
        return ITextColor.Slate900;
    }

    return color;
};

export const useTextApi = ({
    size,
    weight,
    isItalic,
    color,
}: Pick<ITextProps, 'size' | 'weight' | 'isItalic' | 'color'>) => {
    const textClassNames: string[] = [];

    // textClassNames.push('font-TTDaysSans-Black');

    const textSizeClass = useGetTextSizeClass(size);

    textClassNames.push(textSizeClass);

    const textColorClass = useGetFontColor(color);

    textClassNames.push(String(textColorClass));

    const fontFamily = useGetFontFamily({ weight, isItalic });

    textClassNames.push(fontFamily);

    return {
        textClassNames: textClassNames.join(' '),
    };
};
