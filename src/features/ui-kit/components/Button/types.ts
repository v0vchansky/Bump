import { ITextWeight } from '../Text/types';

export const enum IButtonSize {
    S = 's',
    M = 'm',
    L = 'l',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    XL = 'xl',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    XXL = 'xxl',
}

export const enum IButtonType {
    Action = 'action',
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
    weight?: ITextWeight;
    children?: JSX.Element;

    onClick?: () => void;
}
