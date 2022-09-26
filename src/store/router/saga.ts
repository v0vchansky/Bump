import { select, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { PageName } from '../../router/pageName';
import { NavigationType } from '../../router/types';
import { IRootState } from '..';

import * as actions from './actions';

const redirectToAuthPage = function* () {
    const navigation: NavigationType = yield select((state: IRootState) => state.router.navigation);

    navigation.navigate(PageName.Auth);
    navigation.reset({ index: 0, routes: [{ name: PageName.Auth }] });
};

export const routerSaga = function* () {
    yield takeEvery(getType(actions.redirectToAuthPage), redirectToAuthPage);
};
