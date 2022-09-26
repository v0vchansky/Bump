import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { NavigationType } from '../../router/types';

import * as actions from './actions';

export interface IRouterState {
    navigation: NavigationType;
}

export const createRouterReducer = (navigation: NavigationType) => {
    const routerReducer: Reducer<IRouterState, ActionType<typeof actions>> = (state = { navigation }, action) => {
        switch (action.type) {
            case getType(actions.routerUpdateNavigation):
                return {
                    navigation: action.payload,
                };
            default:
                return state;
        }
    };

    return routerReducer;
};
