import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { setGlobalStore } from './globalStore/init';
import { createRootReducer } from './index.reducer';
import { rootSaga } from './index.sagas';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['router', 'modalWindow', 'toast', 'search', 'app'],
};

export const createAppStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const rootReducer = createRootReducer();
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

    setGlobalStore(store);

    sagaMiddleware.run(rootSaga);

    return store;
};

export const createPersistor = (store: ReturnType<typeof createAppStore>) => {
    return persistStore(store);
};
