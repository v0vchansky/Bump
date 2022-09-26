import * as routerActions from '../router/actions';

import { getGlobalStore } from './init';

export const dispatchredirectToAuthPage = () => {
    const globalStore = getGlobalStore();

    if (!globalStore) return;

    globalStore.dispatch(routerActions.redirectToAuthPage());
};
