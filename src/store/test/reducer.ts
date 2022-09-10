import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import * as actions from './actions';

export interface ITestState {
    num: number;
}

const initialState: ITestState = {
    num: 0,
};

export const testReducer: Reducer<ITestState, ActionType<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.minus):
            return {
                ...state,
                num: state.num - 1,
            };
        case getType(actions.plus):
            return {
                ...state,
                num: state.num + 1,
            };
        default:
            return state;
    }
};
