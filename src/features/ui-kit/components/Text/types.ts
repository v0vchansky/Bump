import { ReactNode } from 'react';

import { ConstColor } from '../../constants/types';

export const enum TextSize {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    XS = 'xs',
    S = 's',
    M = 'm',
    L = 'l',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    XL = 'xl',

    // Кастомные
    HelloPage = 'HelloPage',
    ProfileDisplayName = 'ProfileDisplayName',
    ModalTitle = 'ModalTitle',
}

export const ITextAlign = ['left', 'right', 'center'] as const;
export type ITextAlign = typeof ITextAlign[number];

export const enum TextWeight {
    Thin = 'Thin',
    Light = 'Light',
    Regular = 'Regular',
    Bold = 'Bold',
    Black = 'Black',
}

export interface ITextProps {
    children?: ReactNode;
    size?: TextSize;
    weight?: TextWeight;
    isItalic?: boolean;
    isUnderline?: boolean;
    color?: ConstColor;
    align?: ITextAlign;
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    onPress?: VoidFunction;
}
