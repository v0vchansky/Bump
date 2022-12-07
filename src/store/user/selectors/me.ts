import { ApiResponseStatus } from '~/models/apiResponse';
import { IRootState } from '~/store';

import { RelationList } from '../models';

export const getIsMyProfileLoading = (state: IRootState) => {
    return (
        state.user.userResponse === ApiResponseStatus.Loading &&
        state.user.getFriendsResponse === ApiResponseStatus.Loading
    );
};

export const getMyRelations = (state: IRootState) => state.user.relations;

export const getFriendships = (state: IRootState) =>
    state.user.relations.filter(relation => relation.type === RelationList.Friendship);

export const getIncomingFriendRequests = (state: IRootState) =>
    state.user.relations.filter(relation => relation.type === RelationList.IncomingFriendRequest);

export const getIncomingFriendRequestsStatus = (state: IRootState) => state.user.getIncomingFriendRequestsResponse;

export const getOutgoingFriendRequests = (state: IRootState) =>
    state.user.relations.filter(relation => relation.type === RelationList.OutgoingFriendRequest);
