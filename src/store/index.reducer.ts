import { combineReducers } from 'redux';

import { testReducer } from './test/reducer';
import type { IRootState } from './index';

export const createRootReducer = () => {
    return combineReducers<IRootState>({
        test: testReducer,
    });
};
