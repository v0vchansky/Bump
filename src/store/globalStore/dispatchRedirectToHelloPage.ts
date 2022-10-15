import { PageName } from '~/router/pageName';

import * as routerActions from '../router/actions';

import { getGlobalStore } from './init';

export const dispatchRedirectToHelloPage = () => {
    const globalStore = getGlobalStore();

    if (!globalStore) return;

    globalStore.dispatch(routerActions.redirectToPageWithoutHistory(PageName.HelloPage));
};
