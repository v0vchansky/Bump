import * as React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';

export const SafeAreaView: React.FC<{ children?: React.ReactElement }> = ({ children }) => {
    return <RNSafeAreaView style={styles.layout}>{children}</RNSafeAreaView>;
};
