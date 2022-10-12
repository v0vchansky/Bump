import * as React from 'react';
import { View } from 'react-native';

import { useScreenLayoutApi } from './hooks';
import { IScreenLayoutProps } from './types';

export const ScreenLayoutDefault: React.FC<IScreenLayoutProps> = ({ children, bgColor }) => {
    const { styles } = useScreenLayoutApi({ bgColor });

    return <View style={styles.layout}>{children}</View>;
};
