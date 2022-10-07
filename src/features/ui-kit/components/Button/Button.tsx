import * as React from 'react';

import { TWText, TWTouchableOpacity, TWView } from '../../nativewind/nativeComponents';
import { Text } from '../Text/Text';

import { useButtonApi } from './hooks';
import { IButtonProps } from './types';

export const Button: React.FC<IButtonProps> = ({
    text,
    size,
    type,
    width,
    isItalicText,
    weight,
    children,
    onClick,
}) => {
    // const { className, buttonTextColor, textSize } = useButtonApi({ text, size, type, width });

    return (
        <TWView className="flex-row">
            <TWTouchableOpacity
                activeOpacity={0.85}
                // className={className}
                onPress={onClick}
            >
                {/* {children || (
                    <Text size={textSize} isItalic={isItalicText} weight={weight} color={buttonTextColor}>
                        {text}
                    </Text>
                )} */}
                {children || <TWText>text</TWText>}
            </TWTouchableOpacity>
        </TWView>
    );
};
