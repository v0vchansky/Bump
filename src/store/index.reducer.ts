import { combineReducers } from 'redux';

import { authReducer } from '~/features/auth/store/reducer';
import { modalWindowReducer } from '~/overlays/ModalWindow/store/reducer';

import { routerReducer } from './router/reducer';
import { testReducer } from './test/reducer';
import type { IRootState } from './index';

export const createRootReducer = () => {
    return combineReducers<IRootState>({
        test: testReducer,
        router: routerReducer,
        modalWindow: modalWindowReducer,
        auth: authReducer,
    });
};
