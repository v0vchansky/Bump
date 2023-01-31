import { runAction } from '../shadowActions/actions';

import { getGlobalStore } from './init';

export const dispatchShadowAction = (actionId: string) => {
    const globalStore = getGlobalStore();

    if (!globalStore) return;

    globalStore.dispatch(runAction(actionId));
};
