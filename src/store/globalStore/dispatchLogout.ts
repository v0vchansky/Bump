import { logout as logoutAction } from '~/features/auth/store/actions';

import { getGlobalStore } from './init';

export const dispatchLogout = () => {
    const globalStore = getGlobalStore();

    if (!globalStore) return;

    globalStore.dispatch(logoutAction());
};
