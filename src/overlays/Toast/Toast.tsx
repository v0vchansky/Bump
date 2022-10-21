import React from 'react';
import Toast from 'react-native-toast-message';

import { config } from './config';
import { IToastOverlayProps } from './types';

export const ToastOverlay: React.FC<IToastOverlayProps> = ({ children }) => {
    return (
        <>
            {children}
            <Toast onPress={() => Toast.hide()} visibilityTime={2500} config={config} />
        </>
    );
};
