import * as React from 'react';
import { Text as RNText } from 'react-native';

import { useTextApi } from './hooks';
import { ITextProps } from './types';

export const Text: React.FC<ITextProps> = ({ children, weight, size, isItalic, color }) => {
    const { styles } = useTextApi({ size, weight, isItalic, color });

    return <RNText style={styles.text}>{children}</RNText>;
};
