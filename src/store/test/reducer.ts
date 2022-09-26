import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { IAuthLogin } from '../../features/auth/models/auth';

import * as actions from './actions';

export interface ITestState {
    num: number;
    user: IAuthLogin | null;
}

const initialState: ITestState = {
    num: 0,
    user: null,
};

export const testReducer: Reducer<ITestState, ActionType<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.minus):
            return {
                ...state,
                num: state.num - 1,
                user: null,
            };
        case getType(actions.plus):
            return {
                ...state,
                num: state.num + 1,
                user: action.payload,
            };
        default:
            return state;
    }
};
