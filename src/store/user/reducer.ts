import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { ApiResponseStatus } from '~/models/apiResponse';

import * as actions from './actions';
import { IUser, IUserRelation, RelationList } from './models';

export interface IUserState {
    user: IUser | null;
    userResponse: ApiResponseStatus;
    avatarResponse: ApiResponseStatus;

    relations: IUserRelation[];

    getFriendsResponse: ApiResponseStatus;
    getIncomingFriendRequestsResponse: ApiResponseStatus;
    getOutgoingFriendRequestsResponse: ApiResponseStatus;

    changeRelationState: string | null;
    changeRelationResponse: ApiResponseStatus;
}

const initialState: IUserState = {
    user: null,
    userResponse: ApiResponseStatus.NotStarted,
    avatarResponse: ApiResponseStatus.NotStarted,

    relations: [],

    getFriendsResponse: ApiResponseStatus.NotStarted,
    getIncomingFriendRequestsResponse: ApiResponseStatus.NotStarted,
    getOutgoingFriendRequestsResponse: ApiResponseStatus.NotStarted,

    changeRelationState: null,
    changeRelationResponse: ApiResponseStatus.NotStarted,
};

export const userReducer: Reducer<IUserState, ActionType<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.init):
            return {
                ...state,
                user: action.payload,
            };
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

        case getType(actions.getUserRequest):
            return {
                ...state,
                userResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.getUserSuccess):
            return {
                ...state,
                user: action.payload,
                userResponse: ApiResponseStatus.Ok,
            };
        case getType(actions.getUserError):
            return {
                ...state,
                userResponse: ApiResponseStatus.Error,
            };

        // Друзья
        case getType(actions.getUserFriendsRequest):
            return {
                ...state,
                getFriendsResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.getUserFriendsSuccess):
            return {
                ...state,
                relations: [
                    ...state.relations.filter(relation => relation.type !== RelationList.Friendship),
                    ...action.payload,
                ],
                getFriendsResponse: ApiResponseStatus.Ok,
            };
        case getType(actions.getUserFriendsError):
            return {
                ...state,
                getFriendsResponse: ApiResponseStatus.Error,
            };

        // Заявки в друзья
        case getType(actions.getIncomingFriendRequestsRequest):
            return {
                ...state,
                getIncomingFriendRequestsResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.getIncomingFriendRequestsSuccess):
            return {
                ...state,
                relations: [
                    ...state.relations.filter(relation => relation.type !== RelationList.IncomingFriendRequest),
                    ...action.payload,
                ],
                getIncomingFriendRequestsResponse: ApiResponseStatus.Ok,
            };
        case getType(actions.getIncomingFriendRequestsError):
            return {
                ...state,
                getIncomingFriendRequestsResponse: ApiResponseStatus.Error,
            };

        // Исходящие заявки в друзья
        case getType(actions.getOutgoingFriendRequestsRequest):
            return {
                ...state,
                getOutgoingFriendRequestsResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.getOutgoingFriendRequestsSuccess):
            return {
                ...state,
                relations: [
                    ...state.relations.filter(relation => relation.type !== RelationList.OutgoingFriendRequest),
                    ...action.payload,
                ],
                getOutgoingFriendRequestsResponse: ApiResponseStatus.Ok,
            };
        case getType(actions.getOutgoingFriendRequestsError):
            return {
                ...state,
                getOutgoingFriendRequestsResponse: ApiResponseStatus.Error,
            };

        // Запрос на изменения связи
        case getType(actions.changeRelationWithUserRequest):
            return {
                ...state,
                changeRelationState: action.payload,
                changeRelationResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.changeRelationWithUserSuccess):
            return {
                ...state,
                relations: action.payload,
                changeRelationState: null,
                changeRelationResponse: ApiResponseStatus.Ok,
            };
        case getType(actions.changeRelationWithUserError):
            return {
                ...state,
                changeRelationState: null,
                changeRelationResponse: ApiResponseStatus.Error,
            };

        // Изменение/добавление аватарки
        case getType(actions.uploadAvatarRequest):
            return {
                ...state,
                avatarResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.uploadAvatarSuccess):
            return {
                ...state,
                user:
                    state.user === null
                        ? null
                        : {
                              ...state.user,
                              avatarUrl: action.payload,
                          },
                avatarResponse: ApiResponseStatus.Ok,
            };
        case getType(actions.uploadAvatarError):
            return {
                ...state,
                avatarResponse: ApiResponseStatus.Error,
            };

        // Удаление аватарки
        case getType(actions.deleteAvatarRequest):
            return {
                ...state,
                avatarResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.deleteAvatarSuccess):
            return {
                ...state,
                user:
                    state.user === null
                        ? null
                        : {
                              ...state.user,
                              avatarUrl: null,
                          },
                avatarResponse: ApiResponseStatus.Ok,
            };
        case getType(actions.deleteAvatarError):
            return {
                ...state,
                avatarResponse: ApiResponseStatus.Error,
            };

        case getType(actions.reset):
            return initialState;
        default:
            return state;
    }
};
