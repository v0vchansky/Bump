import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { show } from '~/overlays/Toast/store/actions';
import { ToastType } from '~/overlays/Toast/store/types';

import * as api from '../../api/internal/user';
import { searchByUsernameSuccess } from '../search/actions';
import { getSearchResult } from '../search/selectors';

import { getMyRelations } from './selectors/me';
import * as actions from './actions';
import { IUser, IUserRelation, RelationList, RelationRequestType } from './models';

const getUser = function* () {
    yield put(actions.getUserRequest());

    try {
        const user: IUser = yield call(api.getUser);

        yield put(actions.getUserSuccess(user));
    } catch (e) {
        yield put(actions.getUserError());
    }
};

const getUserFriends = function* () {
    yield put(actions.getUserFriendsRequest());

    try {
        const relations: IUserRelation[] = yield call(api.getUserRelationsByType, RelationList.Friendship);

        yield put(actions.getUserFriendsSuccess(relations));
    } catch (e) {
        yield put(actions.getUserFriendsError());
    }
};

const getIncomingFriendRequests = function* () {
    yield put(actions.getIncomingFriendRequestsRequest());

    try {
        const relations: IUserRelation[] = yield call(api.getUserRelationsByType, RelationList.IncomingFriendRequest);

        yield put(actions.getIncomingFriendRequestsSuccess(relations));
    } catch (e) {
        yield put(actions.getIncomingFriendRequestsError());
    }
};

const changeRelationWithUser = function* ({ payload }: ReturnType<typeof actions.changeRelationWithUser>) {
    yield put(actions.changeRelationWithUserRequest(payload.uuid));

    try {
        const response: IUserRelation | undefined = yield call(api.sendRelationRequest, payload.uuid, payload.type);

        let relations: IUserRelation[] = yield select(getMyRelations);

        relations = relations.filter(relation => relation.user.uuid !== payload.uuid);

        switch (payload.type) {
            case RelationRequestType.ResolveFriendRequest:
            case RelationRequestType.SendRequestToFriends:
                if (response) {
                    relations = [...relations, response];
                }

                break;
        }

        if (payload.type === RelationRequestType.ResolveFriendRequest) {
            yield put(show({ type: ToastType.Success, text1: 'Урааа', text2: 'У тебя новый друг' }));
        }

        if (payload.fromSearch) {
            const searchResultRelations: IUserRelation[] = yield select(getSearchResult);

            yield put(
                searchByUsernameSuccess(
                    searchResultRelations.map(relation => {
                        let newType: RelationList;

                        switch (payload.type) {
                            case RelationRequestType.CancelFriendRequest:
                            case RelationRequestType.RejectFriendRequest:
                            case RelationRequestType.RemoveFromFriends:
                                newType = RelationList.Nobody;
                                break;
                            case RelationRequestType.ResolveFriendRequest:
                                newType = RelationList.Friendship;
                                break;
                            case RelationRequestType.SendRequestToFriends:
                                newType = RelationList.OutgoingFriendRequest;
                                break;
                        }

                        return {
                            type: newType,
                            user: relation.user,
                        };
                    }),
                ),
            );
        }

        yield put(actions.changeRelationWithUserSuccess(relations));
    } catch (e) {
        yield put(show({ type: ToastType.Error, text1: 'Упс...', text2: 'Что-то пошло не так' }));
        yield put(actions.changeRelationWithUserError());
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
    yield takeEvery(getType(actions.changeRelationWithUser), changeRelationWithUser);
};
