import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { getUserRelationsByType } from '~/api/internal/user';
import { PROFILE_MODAL_NAME } from '~/features/mapScreen/components/ProfileModal/ProfileModal';
import { closeByName, openByName } from '~/overlays/ModalWindow/store/sagas';
import { show } from '~/overlays/Toast/store/actions';
import { ToastType } from '~/overlays/Toast/store/types';

import * as api from '../../api/internal/search';
import * as userApi from '../../api/internal/user';
import { IFullUser, IUser, IUserRelation, RelationList } from '../user/models';
import { getMe, getMyRelations } from '../user/selectors/me';

import * as actions from './actions';
import { IProfilesStackItem } from './models';
import { getProfilesStack } from './selectors';

const searchByUsername = function* ({ payload }: ReturnType<typeof actions.searchByUsername>) {
    yield put(actions.searchByUsernameRequest());

    try {
        const users: IUserRelation[] = yield call(api.searchByUsername, payload);

        if (users) {
            yield put(actions.searchByUsernameSuccess(users));

            return;
        }

        throw new Error();
    } catch (e) {
        yield put(show({ type: ToastType.Error, text1: 'Упс...', text2: 'Что-то пошло не так' }));
        yield put(actions.searchByUsernameError());
    }
};

const nextProfile = function* ({ payload }: ReturnType<typeof actions.nextProfile>) {
    yield put(actions.addNextProfile(payload));

    yield put(actions.getProfileRequest());

    try {
        const response: IUserRelation[] = yield call(getUserRelationsByType, RelationList.Friendship, payload.uuid);

        const myRelations: IUserRelation[] = yield select(getMyRelations);
        const me: IUser | undefined = yield select(getMe);

        const relations: IUserRelation[] = response.map(({ user: { uuid }, user }) => {
            const myRelationWithUser = myRelations.find(relation => relation.user.uuid === uuid);
            const isMe = uuid === me?.uuid;

            let type = RelationList.Nobody;

            if (myRelationWithUser) {
                if (myRelationWithUser.type === RelationList.Friendship && payload.uuid !== me?.uuid) {
                    type = RelationList.MutualFriendship;
                } else {
                    type = myRelationWithUser.type;
                }
            }

            if (isMe) {
                type = RelationList.You;
            }

            return {
                type,
                user,
            };
        });

        yield put(actions.getProfileSuccess({ user: payload, relations }));
    } catch (e) {
        yield put(actions.getProfileError());
    }
};

const openProfile = function* ({ payload }: ReturnType<typeof actions.openProfile>) {
    yield call(openByName, { payload: PROFILE_MODAL_NAME });
    yield put(actions.resetProfilesStack());

    yield fork(nextProfile, { payload });
};

const prevProfile = function* () {
    const stack: IProfilesStackItem[] = yield select(getProfilesStack);

    if (stack.length === 1) {
        yield call(closeByName, { payload: PROFILE_MODAL_NAME });
        yield put(actions.resetProfilesStack());

        return;
    }

    yield put(actions.prevProfileSuccess());
};

const forceUpdateUserInStack = function* ({ payload: uuid }: ReturnType<typeof actions.forceUpdateUserInStack>) {
    try {
        const user: IFullUser = yield call(userApi.getUser, uuid);

        yield put(actions.forceUpdateUserInStackSuccess(user));
    } catch (_e) {
        //
    }
};

export const searchSaga = function* () {
    yield takeEvery(getType(actions.searchByUsername), searchByUsername);
    yield takeEvery(getType(actions.openProfile), openProfile);
    yield takeEvery(getType(actions.nextProfile), nextProfile);
    yield takeEvery(getType(actions.prevProfile), prevProfile);
    yield takeEvery(getType(actions.forceUpdateUserInStack), forceUpdateUserInStack);
};
