import type { createAppStore } from '../create-app-store';

type IGlobalStore = ReturnType<typeof createAppStore>;

let globalStore: IGlobalStore | undefined;

export const setGlobalStore = (store: IGlobalStore) => {
    globalStore = store;
};

export const getGlobalStore = () => {
    return globalStore;
};
