import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { createRootReducer } from './index.reducer';
import { rootSaga } from './index.sagas';

export const createAppStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(createRootReducer(), applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(rootSaga);

    return store;
};
