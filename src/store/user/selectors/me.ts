import { ApiResponseStatus } from '~/models/apiResponse';
import { IRootState } from '~/store';

import { RelationList } from '../models';

export const getIsMyProfileLoading = (state: IRootState) => {
    return (
        state.user.userResponse === ApiResponseStatus.Loading &&
        state.user.getFriendsResponse === ApiResponseStatus.Loading
    );
};

export const getMe = (state: IRootState) => state.user.user;

export const getIsMe = (uuid: string) => {
    return (state: IRootState) => state.user.user?.uuid === uuid;
};

export const getMyRelations = (state: IRootState) => state.user.relations;

export const getFriendships = (state: IRootState) =>
    state.user.relations.filter(relation => relation.type === RelationList.Friendship);
export const getIsFriendshipsLoading = (state: IRootState) =>
    state.user.getFriendsResponse === ApiResponseStatus.Loading;

export const getIncomingFriendRequests = (state: IRootState) =>
    state.user.relations.filter(relation => relation.type === RelationList.IncomingFriendRequest);

export const getIncomingFriendRequestsStatus = (state: IRootState) => state.user.getIncomingFriendRequestsResponse;

export const getOutgoingFriendRequests = (state: IRootState) =>
    state.user.relations.filter(relation => relation.type === RelationList.OutgoingFriendRequest);
export const getOutgoingFriendRequestsStatus = (state: IRootState) => state.user.getOutgoingFriendRequestsResponse;
