import * as React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { IAuthLayoutProps } from './types';

export const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
    return <View style={styles.layout}>{children}</View>;
};
