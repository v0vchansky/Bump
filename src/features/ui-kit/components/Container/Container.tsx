import * as React from 'react';
import { View } from 'react-native';

import { useContainerApi } from './hooks';
import { IContainerProps } from './types';

export const Container: React.FC<IContainerProps> = ({ children, top, right, bottom, left }) => {
    const { styles } = useContainerApi({ top, right, bottom, left });

    return <View style={styles.gap}>{children}</View>;
};
