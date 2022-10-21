import { show } from '~/overlays/Toast/store/actions';
import { IToastShowParams } from '~/overlays/Toast/store/types';

import { getGlobalStore } from './init';

export const dispatchShowToast = (params: IToastShowParams) => {
    const globalStore = getGlobalStore();

    if (!globalStore) return;

    globalStore.dispatch(show(params));
};
