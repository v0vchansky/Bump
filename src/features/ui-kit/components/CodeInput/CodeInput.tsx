import * as React from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Text } from '~/features/ui-kit/components/Text/Text';

import { TextSize, TextWeight } from '../Text/types';

import { styles } from './styles';
import { ICodeInputProps } from './types';

export const CodeInput: React.FC<ICodeInputProps> = ({ value, autoFocus, codeLength, onChange }) => {
    const [code, setCode] = React.useState(value || '');
    const [containerIsFocused, setContainerIsFocused] = React.useState(Boolean(autoFocus));

    const codeDigitsArray = new Array(codeLength).fill(0);

    const ref = React.useRef<TextInput>(null);

    const handleOnPress = () => {
        setContainerIsFocused(true);
        ref?.current?.focus();
    };

    const handleOnBlur = () => {
        setContainerIsFocused(false);
    };

    const toDigitInput = (_value: number, idx: number) => {
        const emptyInputChar = ' ';
        const digit = code[idx] || emptyInputChar;

        const isCurrentDigit = idx === code.length;
        const isLastDigit = idx === codeLength - 1;
        const isCodeFull = code.length === codeLength;

        const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

        const containerStyle =
            containerIsFocused && isFocused
                ? { ...styles.inputContainer, ...styles.inputContainerFocused }
                : styles.inputContainer;

        return (
            <View key={idx} style={containerStyle}>
                <Text size={TextSize.XL} weight={TextWeight.Black}>
                    {digit}
                </Text>
            </View>
        );
    };

    const onSetCode = React.useCallback(
        (code: string) => {
            if (!isNaN(Number(code))) {
                setCode(code);
                onChange(code);
            }
        },
        [onChange],
    );

    return (
        <View style={styles.container}>
            <Pressable style={styles.inputsContainer} onPress={handleOnPress}>
                {codeDigitsArray.map(toDigitInput)}
            </Pressable>
            <TextInput
                ref={ref}
                value={code}
                onChangeText={onSetCode}
                onSubmitEditing={handleOnBlur}
                keyboardType="number-pad"
                returnKeyType="done"
                textContentType="oneTimeCode"
                maxLength={codeLength}
                style={styles.hiddenCodeInput}
                autoFocus={autoFocus}
            />
        </View>
    );
};
