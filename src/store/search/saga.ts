import { call, put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { show } from '~/overlays/Toast/store/actions';
import { ToastType } from '~/overlays/Toast/store/types';

import * as api from '../../api/internal/search';
import { IUserRelation } from '../user/models';

import * as actions from './actions';

const searchByUsername = function* ({ payload }: ReturnType<typeof actions.searchByUsername>) {
    yield put(actions.searchByUsernameRequest());

    try {
        const users: IUserRelation[] = yield call(api.searchByUsername, payload);

        if (users) {
            yield put(actions.searchByUsernameSuccess(users));

            return;
        }

        yield put(show({ type: ToastType.Error, text1: 'Упс...', text2: 'Что-то пошло не так' }));
        yield put(actions.searchByUsernameError());
    } catch (e) {
        yield put(show({ type: ToastType.Error, text1: 'Упс...', text2: 'Что-то пошло не так' }));
        yield put(actions.searchByUsernameError());
    }
};

export const searchSaga = function* () {
    yield takeEvery(getType(actions.searchByUsername), searchByUsername);
};
