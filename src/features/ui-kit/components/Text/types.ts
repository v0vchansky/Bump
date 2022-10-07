export const enum ITextSize {
    S = 's',
    M = 'm',
    L = 'l',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    XL = 'xl',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    XXL = 'xxl',
}

export const enum ITextWeight {
    Thin = 'Thin',
    Light = 'Light',
    Regular = 'Regular',
    Bold = 'Bold',
    Black = 'Black',
}

export const enum ITextColor {
    Slate50 = 'text-slate-50',
    Slate900 = 'text-slate-900',
    Black = 'text-black',
    White = 'text-white',
}

export interface ITextProps {
    children: string;
    className?: string;
    size?: ITextSize;
    weight?: ITextWeight;
    isItalic?: boolean;
    color?: ITextColor;
}
