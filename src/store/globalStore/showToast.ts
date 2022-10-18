import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';

import { show } from '~/overlays/Toast/store/actions';

import { getGlobalStore } from './init';

export const showToast = (message: string, options?: ToastOptions) => {
    const globalStore = getGlobalStore();

    if (!globalStore) return;

    globalStore.dispatch(show({ message, options }));
};
