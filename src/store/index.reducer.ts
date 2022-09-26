import { combineReducers } from 'redux';

import { NavigationType } from '../router/types';

import { createRouterReducer } from './router/reducer';
import { testReducer } from './test/reducer';
import type { IRootState } from './index';

export const createRootReducer = (navigation: NavigationType) => {
    return combineReducers<IRootState>({
        test: testReducer,
        router: createRouterReducer(navigation),
    });
};
