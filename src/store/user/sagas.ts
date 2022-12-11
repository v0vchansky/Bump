import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { show } from '~/overlays/Toast/store/actions';
import { ToastType } from '~/overlays/Toast/store/types';

import * as api from '../../api/internal/user';
import { forceUpdateUserInStack, updateProfilesStackRelations, updateSearchResultRelations } from '../search/actions';

import { getMe, getMyRelations } from './selectors/me';
import * as actions from './actions';
import { IFullUser, IUser, IUserRelation, RelationList, RelationRequestType } from './models';

export const getUser = function* () {
    yield put(actions.getUserRequest());

    try {
        const user: IUser = yield call(api.getUser);

        yield put(actions.getUserSuccess(user));
    } catch (e) {
        yield put(actions.getUserError());
    }
};

export const getUserFriends = function* () {
    yield put(actions.getUserFriendsRequest());

    try {
        const relations: IUserRelation[] = yield call(api.getUserRelationsByType, RelationList.Friendship);

        yield put(actions.getUserFriendsSuccess(relations));
    } catch (e) {
        yield put(actions.getUserFriendsError());
    }
};

export const getIncomingFriendRequests = function* () {
    yield put(actions.getIncomingFriendRequestsRequest());

    try {
        const relations: IUserRelation[] = yield call(api.getUserRelationsByType, RelationList.IncomingFriendRequest);

        yield put(actions.getIncomingFriendRequestsSuccess(relations));
    } catch (e) {
        yield put(actions.getIncomingFriendRequestsError());
    }
};

export const getOutgoingFriendRequests = function* () {
    yield put(actions.getOutgoingFriendRequestsRequest());

    try {
        const relations: IUserRelation[] = yield call(api.getUserRelationsByType, RelationList.OutgoingFriendRequest);

        yield put(actions.getOutgoingFriendRequestsSuccess(relations));
    } catch (e) {
        yield put(actions.getOutgoingFriendRequestsError());
    }
};

const syncRelation = function* (uuid: string, type: RelationList) {
    const me: IUser = yield select(getMe);

    yield put(updateProfilesStackRelations({ uuid, type, myUuid: me.uuid }));
    yield put(updateSearchResultRelations({ uuid, type }));
};

const mapRequestTypeToRelationType = {
    [RelationRequestType.CancelFriendRequest]: RelationList.Nobody,
    [RelationRequestType.RejectFriendRequest]: RelationList.Nobody,
    [RelationRequestType.RemoveFromFriends]: RelationList.Nobody,
    [RelationRequestType.ResolveFriendRequest]: RelationList.Friendship,
    [RelationRequestType.SendRequestToFriends]: RelationList.OutgoingFriendRequest,
};

const changeRelationWithUser = function* ({
    payload: { uuid, type },
}: ReturnType<typeof actions.changeRelationWithUser>) {
    yield put(actions.changeRelationWithUserRequest(uuid));

    try {
        const response: IUserRelation | undefined = yield call(api.sendRelationRequest, uuid, type);

        const relations: IUserRelation[] = yield select(getMyRelations);

        let updatedRelations = relations.filter(relation => relation.user.uuid !== uuid);

        switch (type) {
            case RelationRequestType.ResolveFriendRequest:
            case RelationRequestType.SendRequestToFriends:
                if (response) {
                    updatedRelations = [...updatedRelations, response];
                }

                break;
        }

        if (type === RelationRequestType.ResolveFriendRequest) {
            yield put(show({ type: ToastType.Success, text1: 'Урааа', text2: 'У тебя новый друг' }));
        }

        yield put(actions.changeRelationWithUserSuccess(updatedRelations));

        yield call(syncRelation, uuid, mapRequestTypeToRelationType[type]);
    } catch (e) {
        yield put(show({ type: ToastType.Error, text1: 'Упс...', text2: 'Это действие недоступно' }));
        yield put(actions.changeRelationWithUserError());
    }
};

const uploadAvatar = function* ({ payload: image }: ReturnType<typeof actions.uploadAvatar>) {
    yield put(actions.uploadAvatarRequest());

    try {
        const avatarUrl: string = yield call(api.uploadAvatar, image);

        yield put(actions.uploadAvatarSuccess(avatarUrl));
    } catch (e) {
        yield put(show({ type: ToastType.Error, text1: 'Упс...', text2: 'Что-то пошло не так...' }));
        yield put(actions.uploadAvatarError());
    } finally {
        const me: IFullUser = yield select(getMe);

        yield put(forceUpdateUserInStack(me.uuid));
    }
};

const deleteAvatar = function* () {
    yield put(actions.deleteAvatarRequest());

    try {
        yield call(api.deleteAvatar);

        yield put(actions.deleteAvatarSuccess());
    } catch (e) {
        yield put(show({ type: ToastType.Error, text1: 'Упс...', text2: 'Что-то пошло не так...' }));
        yield put(actions.deleteAvatarError());
    } finally {
        const me: IFullUser = yield select(getMe);

        yield put(forceUpdateUserInStack(me.uuid));
    }
};

const getUserProfileInfo = function* () {
    yield [getUser, getUserFriends].map(call);
};

export const userSaga = function* () {
    yield takeEvery(getType(actions.getUserProfileInfo), getUserProfileInfo);
    yield takeEvery(getType(actions.getUser), getUser);
    yield takeEvery(getType(actions.getUserFriends), getUserFriends);
    yield takeEvery(getType(actions.getIncomingFriendRequests), getIncomingFriendRequests);
    yield takeEvery(getType(actions.getOutgoingFriendRequests), getOutgoingFriendRequests);
    yield takeEvery(getType(actions.changeRelationWithUser), changeRelationWithUser);
    yield takeEvery(getType(actions.uploadAvatar), uploadAvatar);
    yield takeEvery(getType(actions.deleteAvatar), deleteAvatar);
};
