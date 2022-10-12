import * as React from 'react';
import { View } from 'react-native';

import { useGapViewApi } from './hooks';
import { IGapViewProps } from './types';

export const GapView: React.FC<IGapViewProps> = ({ children, top, right, bottom, left }) => {
    const { styles } = useGapViewApi({ top, right, bottom, left });

    return <View style={styles.gap}>{children}</View>;
};
