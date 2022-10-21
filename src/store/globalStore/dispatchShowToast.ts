import { show } from '~/overlays/Toast/store/actions';
import { ToastShowParams } from '~/overlays/Toast/store/types';

import { getGlobalStore } from './init';

export const dispatchShowToast = (params: ToastShowParams) => {
    const globalStore = getGlobalStore();

    if (!globalStore) return;

    globalStore.dispatch(show(params));
};
