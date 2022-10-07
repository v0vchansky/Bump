import { ITextColor, ITextSize } from '../Text/types';

import { IButtonProps, IButtonSize, IButtonType, IButtonWidth } from './types';

const useGetTextSize = (size?: IButtonSize): ITextSize => {
    const defaultSize: ITextSize = ITextSize.L;

    switch (size) {
        case IButtonSize.S:
            return ITextSize.S;
        case IButtonSize.M:
            return ITextSize.M;
        case IButtonSize.L:
            return defaultSize;
        case IButtonSize.XL:
            return ITextSize.XL;
        case IButtonSize.XXL:
            return ITextSize.XXL;
        default:
            return defaultSize;
    }
};

const useGetButtonTextColor = (type?: IButtonType): ITextColor => {
    const defaultColor = ITextColor.Slate50;

    switch (type) {
        case IButtonType.Action:
            return defaultColor;
        default:
            return defaultColor;
    }
};

const useGetButtonBgColorClasses = (type?: IButtonType): string[] => {
    const defaultClasses: string[] = ['bg-blue-500'];

    switch (type) {
        case IButtonType.Action:
            return defaultClasses;
        default:
            return defaultClasses;
    }
};

const useGetButtonPaddingsClasses = (size?: IButtonSize): string[] => {
    const defaultSize: string[] = ['pt-1.5', 'pr-2.5', 'pb-1.5', 'pl-2.5', 'rounded-lg'];

    switch (size) {
        case IButtonSize.S:
            return ['pt-1', 'pr-2', 'pb-1', 'pl-2', 'rounded-lg'];
        case IButtonSize.M:
            return ['pt-1', 'pr-2.5', 'pb-1', 'pl-2.5', 'rounded-lg'];
        case IButtonSize.L:
            return defaultSize;
        case IButtonSize.XL:
            return ['pt-1.5', 'pr-2.5', 'pb-1.5', 'pl-2.5', 'rounded-lg'];
        case IButtonSize.XXL:
            return ['pt-2', 'pr-3', 'pb-2', 'pl-3', 'rounded-xl'];
        default:
            return defaultSize;
    }
};

export const useButtonApi = ({ size, type, width }: IButtonProps) => {
    const className: string[] = [];
    const textClassName: string[] = ['items-center'];

    const textSize = useGetTextSize(size);

    const buttonTextColor = useGetButtonTextColor(type);

    // Классы для обертки
    const buttonBgColorClasses = useGetButtonBgColorClasses(type);

    className.push(...buttonBgColorClasses);

    const buttonPaddingsClasses = useGetButtonPaddingsClasses(size);

    className.push(...buttonPaddingsClasses);

    if (width === IButtonWidth.Max) {
        className.push('grow', 'items-center');
    }

    return {
        className: className.join(' '),
        textClassName: textClassName.join(' '),
        buttonTextColor,
        textSize,
    };
};
