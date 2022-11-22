import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { IUser } from './models';

export interface IUserState {
    user: IUser | null;
}

const initialState: IUserState = {
    user: null,
};

export const userReducer: Reducer<IUserState, ActionType<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.init):
            return {
                user: action.payload,
            };
        case getType(actions.reset):
            return initialState;

        case getType(actions.setUserProfileInfo):
            return {
                ...state,
                user: state.user
                    ? {
                          ...state.user,
                          [action.payload.fieldName]: action.payload.value,
                      }
                    : state.user,
            };
        default:
            return state;
    }
};
