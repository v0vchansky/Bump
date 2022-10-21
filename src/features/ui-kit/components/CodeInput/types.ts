export interface ICodeInputProps {
    value?: string;
    autoFocus?: boolean;
    codeLength: number;
    onChange: (value: string) => void;
    onPress?: () => void;
}
