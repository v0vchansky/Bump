import { ITextInputProps, TextInputSize } from './types';

const useGetTextInputSize = (size?: TextInputSize): string => {
    const defaultSize = 'text-xl';

    switch (size) {
        case TextInputSize.S:
            return 'text-base';
        case TextInputSize.M:
            return 'text-lg';
        case TextInputSize.L:
        default:
            return defaultSize;
    }
};

export const useTextInputApi = ({ size, className }: ITextInputProps) => {
    // const fontFamily = 'font-[TTDaysSans-Regular]';
    // const fontFamily = 'font-serif';
    const classes: string[] = [];

    const inputSize = useGetTextInputSize(size);

    classes.push(inputSize);

    return {
        className: [classes, ...(className || [])].join(' '),
    };
};
