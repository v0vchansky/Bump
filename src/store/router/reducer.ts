import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { NavigationContainerRef } from './types';

export interface IRouterState {
    navigation: NavigationContainerRef;
}

const initialState: IRouterState = {
    navigation: null,
};

export const routerReducer: Reducer<IRouterState, ActionType<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.routerUpdateNavigation):
            return {
                navigation: action.payload,
            };
        default:
            return state;
    }
};
