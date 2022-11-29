import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Loader } from '../Loader/Loader';
import { Text } from '../Text/Text';

import { useButtonApi } from './hooks';
import { IButtonProps, IButtonType } from './types';

export const Button: React.FC<IButtonProps> = ({
    text,
    size,
    type,
    width,
    isItalicText,
    weight,
    children,
    isLoading,
    disabled,
    activeOpacity,
    onClick,
}) => {
    const {
        styles,
        props: { buttonTextColor, textSize },
    } = useButtonApi({ text, size, type, width, isLoading, disabled });

    const content = React.useMemo(() => {
        if (isLoading) {
            return <Loader dark={type === IButtonType.Transparent || type === IButtonType.TransparentBordered} />;
        }

        return (
            children || (
                <Text size={textSize} isItalic={isItalicText} weight={weight} color={buttonTextColor}>
                    {text}
                </Text>
            )
        );
    }, [buttonTextColor, children, isItalicText, isLoading, text, textSize, type, weight]);

    return (
        <View style={styles.wrapperStyles}>
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={activeOpacity || 0.85}
                onPress={onClick}
                style={styles.buttonStyles}
            >
                {content}
            </TouchableOpacity>
        </View>
    );
};
