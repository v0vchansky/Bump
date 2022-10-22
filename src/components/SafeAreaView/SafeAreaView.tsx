import * as React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';

export const SafeAreaView: React.FC<{
    children?: React.ReactElement;
    pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
}> = ({ children, pointerEvents }) => {
    return (
        <RNSafeAreaView pointerEvents={pointerEvents} style={styles.layout}>
            {children}
        </RNSafeAreaView>
    );
};
