export const TextInputSize = ['s', 'm', 'l', 'xl'] as const;
export type ITextInputSize = typeof TextInputSize[number];

export interface ITextInputProps {
    value: string;
    placeholder?: string;
    isSecure?: boolean;
    size?: ITextInputSize;
    toUpperCase?: boolean;
    autoFocus?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    maxLength?: number;
    withBottomBorder?: boolean;

    onChange: (value: string) => void;
    onClick?: VoidFunction;
}
