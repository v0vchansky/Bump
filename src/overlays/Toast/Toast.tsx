import React from 'react';
import Toast from 'react-native-toast-message';

import { IToastOverlayProps } from './types';

export const ToastOverlay: React.FC<IToastOverlayProps> = ({ children }) => {
    return (
        <>
            {children}
            <Toast />
        </>
    );
};
