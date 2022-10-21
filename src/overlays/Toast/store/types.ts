import type { ToastShowParams as RNToastShowParams } from 'react-native-toast-message/lib/src/types';

export const enum ToastType {
    Success = 'success',
    Error = 'error',
}

export interface IToastShowParams extends RNToastShowParams {
    type: ToastType;
}
