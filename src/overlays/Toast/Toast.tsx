import React from 'react';
import Toast, { ToastProvider } from 'react-native-toast-notifications';
import { useDispatch } from 'react-redux';

import { create } from './store/actions';
import { IToastOverlayProps } from './types';

export const ToastOverlay: React.FC<IToastOverlayProps> = ({ children }) => {
    const dispatch = useDispatch();

    const onInitToast = React.useCallback(
        (ref: Toast | null) => {
            dispatch(create(ref));
        },
        [dispatch],
    );

    return (
        <ToastProvider>
            {children}
            <Toast ref={onInitToast} />
        </ToastProvider>
    );
};
