import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { ApiResponseStatus } from '~/models/apiResponse';

import { IUserRelation } from '../user/models';

import * as actions from './actions';

export interface ISearchState {
    users: IUserRelation[];
    response: ApiResponseStatus;
}

const initialState: ISearchState = {
    users: [],
    response: ApiResponseStatus.NotStarted,
};

export const searchReducer: Reducer<ISearchState, ActionType<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.searchByUsernameRequest):
            return {
                ...state,
                users: [],
                response: ApiResponseStatus.Loading,
            };
        case getType(actions.searchByUsernameSuccess):
            return {
                ...state,
                response: ApiResponseStatus.Ok,
                users: action.payload,
            };
        case getType(actions.searchByUsernameError):
            return {
                ...state,
                response: ApiResponseStatus.Error,
            };
        case getType(actions.reset):
            return {
                ...state,
                users: [],
                response: ApiResponseStatus.NotStarted,
            };
        default:
            return state;
    }
};
