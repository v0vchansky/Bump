import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { ApiResponseStatus } from '~/models/apiResponse';

import { IUserRelation, RelationList } from '../user/models';

import * as actions from './actions';
import { IProfilesStackItem } from './models';

export interface ISearchState {
    users: IUserRelation[];
    response: ApiResponseStatus;

    profilesStack: IProfilesStackItem[];
    profilesStackResponse: ApiResponseStatus;
}

const initialState: ISearchState = {
    users: [],
    response: ApiResponseStatus.NotStarted,

    profilesStack: [],
    profilesStackResponse: ApiResponseStatus.NotStarted,
};

export const searchReducer: Reducer<ISearchState, ActionType<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        // Поиск
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
        case getType(actions.updateSearchResultRelations):
            return {
                ...state,
                users: state.users.map(relation => {
                    let updatedType = relation.type;

                    if (relation.user.uuid === action.payload.uuid) {
                        updatedType = action.payload.type;
                    }

                    return {
                        type: updatedType,
                        user: relation.user,
                    };
                }),
            };

        // Переходы по профилям
        case getType(actions.addNextProfile):
            return {
                ...state,
                profilesStack: [...state.profilesStack, { user: action.payload, relations: [] }],
            };
        case getType(actions.resetProfilesStack):
            return {
                ...state,
                profilesStack: [],
                profilesStackResponse: ApiResponseStatus.NotStarted,
            };
        case getType(actions.prevProfileSuccess):
            return {
                ...state,
                profilesStack: state.profilesStack.slice(0, -1),
            };
        case getType(actions.getProfileRequest):
            return {
                ...state,
                profilesStackResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.getProfileSuccess):
            return {
                ...state,
                profilesStackResponse: ApiResponseStatus.Ok,
                profilesStack: [...state.profilesStack.slice(0, -1), action.payload],
            };
        case getType(actions.updateProfilesStackRelations):
            return {
                ...state,
                profilesStack: state.profilesStack.map(stackItem => {
                    const isMe = stackItem.user.uuid === action.payload.myUuid;

                    const updatedRelations: IUserRelation[] = stackItem.relations
                        .map(stackItemRelation => {
                            let updatedType = stackItemRelation.type;

                            if (stackItemRelation.user.uuid === action.payload.uuid) {
                                updatedType = action.payload.type;
                            }

                            return {
                                type: updatedType,
                                user: stackItemRelation.user,
                            };
                        })
                        .filter(relation => {
                            if (isMe && relation.type === RelationList.Nobody) {
                                return false;
                            }

                            return true;
                        });

                    return {
                        user: stackItem.user,
                        relations: updatedRelations,
                    };
                }),
            };
        case getType(actions.forceUpdateUserInStackSuccess):
            return {
                ...state,
                profilesStack: state.profilesStack.map(({ user, relations }) => {
                    return {
                        user: user.uuid === action.payload.uuid ? action.payload : user,
                        relations,
                    };
                }),
            };

        default:
            return state;
    }
};
