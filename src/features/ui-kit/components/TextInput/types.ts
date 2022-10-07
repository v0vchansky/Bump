import { IClassNameProps } from '~/models/className';

export const enum TextInputSize {
    S = 's',
    M = 'm',
    L = 'l',
}

export interface ITextInputProps extends IClassNameProps {
    value: string;
    placeholder?: string;
    isSecure?: boolean;
    size?: TextInputSize;

    onChange: (value: string) => void;
}
