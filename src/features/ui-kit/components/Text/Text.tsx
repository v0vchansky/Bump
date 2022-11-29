import * as React from 'react';
import { Text as RNText } from 'react-native';

import { useTextApi } from './hooks';
import { ITextProps } from './types';

export const Text: React.FC<ITextProps> = ({
    children,
    weight,
    size,
    isItalic,
    color,
    align = 'left',
    numberOfLines,
    ellipsizeMode,
}) => {
    const { styles } = useTextApi({ size, weight, isItalic, color, align });

    return (
        <RNText numberOfLines={numberOfLines} style={styles.text} ellipsizeMode={ellipsizeMode}>
            {children}
        </RNText>
    );
};
