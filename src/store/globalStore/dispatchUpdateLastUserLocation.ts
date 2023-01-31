import { updateLastUserLocation } from '../map/actions';

import { getGlobalStore } from './init';

export const dispatchUpdateLastUserLocation = (userUuid: string) => {
    const globalStore = getGlobalStore();

    if (!globalStore) return;

    globalStore.dispatch(updateLastUserLocation(userUuid));
};
