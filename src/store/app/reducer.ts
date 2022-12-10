import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import * as actions from './actions';

export interface IAppState {
    inited: boolean;
}

const initialState: IAppState = {
    inited: false,
};

export const appReducer: Reducer<IAppState, ActionType<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.initSuccess):
            return {
                ...state,
                inited: true,
            };
        default:
            return state;
    }
};
