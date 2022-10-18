import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';

export interface IToastShowPayload {
    message: string;
    options?: ToastOptions;
}
