import * as React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { useTextInputApi } from './hooks';
import { ITextInputProps } from './types';

export const TextInput: React.FC<ITextInputProps> = ({
    size,
    autoFocus,
    autoCapitalize,
    value,
    placeholder,
    autoCorrect,
    maxLength,
    onChange,
    onClick,
}) => {
    const { styles } = useTextInputApi({ size });

    return (
        <RNTextInput
            onChangeText={onChange}
            placeholder={placeholder}
            autoFocus={autoFocus}
            style={styles.root}
            value={value}
            editable={!onClick}
            onPressIn={onClick}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect || false}
            maxLength={maxLength}
        />
    );
};
