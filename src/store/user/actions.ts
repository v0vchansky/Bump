import { createAction } from 'typesafe-actions';

import { IChangeRelationWithUserPayload, ISetUserProfileInfoPayload, IUser, IUserRelation } from './models';

const prefix = 'user';

export const init = createAction(`${prefix}/init`)<IUser>();

export const setUserProfileInfo = createAction(`${prefix}/set-user-profile-info`)<ISetUserProfileInfoPayload>();

export const getUser = createAction(`${prefix}/get-user`)();
export const getUserRequest = createAction(`${prefix}/get-user-request`)();
export const getUserSuccess = createAction(`${prefix}/get-user-success`)<IUser>();
export const getUserError = createAction(`${prefix}/get-user-error`)();

export const getUserFriends = createAction(`${prefix}/get-user-friends`)();
export const getUserFriendsRequest = createAction(`${prefix}/get-user-friends-request`)();
export const getUserFriendsSuccess = createAction(`${prefix}/get-user-friends-success`)<IUserRelation[]>();
export const getUserFriendsError = createAction(`${prefix}/get-user-friends-error`)();

export const getIncomingFriendRequests = createAction(`${prefix}/get-incoming-friend-requests`)();
export const getIncomingFriendRequestsRequest = createAction(`${prefix}/get-incoming-friend-requests-request`)();
export const getIncomingFriendRequestsSuccess = createAction(`${prefix}/get-incoming-friend-requests-success`)<
    IUserRelation[]
>();
export const getIncomingFriendRequestsError = createAction(`${prefix}/get-incoming-friend-requests-error`)();

export const getUserProfileInfo = createAction(`${prefix}/get-user-profile-info`)();

export const changeRelationWithUser = createAction(
    `${prefix}/chahge-relation-with-user`,
)<IChangeRelationWithUserPayload>();
export const changeRelationWithUserRequest = createAction(`${prefix}/chahge-relation-with-user-request`)<string>();
export const changeRelationWithUserSuccess = createAction(`${prefix}/chahge-relation-with-user-success`)<
    IUserRelation[]
>();
export const changeRelationWithUserError = createAction(`${prefix}/chahge-relation-with-user-error`)();

export const reset = createAction(`${prefix}/reset`)();
