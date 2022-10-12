import { ReactNode } from 'react';

import { TextWeight } from '../Text/types';

export const enum IButtonSize {
    S = 's',
    M = 'm',
    L = 'l',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    XL = 'xl',
}

export const enum IButtonType {
    Action = 'action',
    Transparent = 'transparent',
}

export const enum IButtonWidth {
    Max = 'max',
}

export interface IButtonProps {
    text: string;
    isItalicText?: boolean;
    size?: IButtonSize;
    type?: IButtonType;
    width?: IButtonWidth;
    weight?: TextWeight;
    children?: ReactNode;
    isLoading?: boolean;
    disabled?: boolean;

    onClick?: () => void;
}
