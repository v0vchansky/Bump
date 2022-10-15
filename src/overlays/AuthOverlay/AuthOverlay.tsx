import * as React from 'react';
import { View } from 'react-native';

import { Screensaver } from '~/components/Screensaver/Screensaver';

import { useAuthOverlay } from './hooks';
import { styles } from './styles';
import { IAuthOverlayProps } from './types';

export const AuthOverlay: React.FC<IAuthOverlayProps> = ({ children }) => {
    const { isLoading } = useAuthOverlay();

    return (
        <View style={styles.layout}>
            {children}
            {isLoading && <Screensaver />}
        </View>
    );
};
