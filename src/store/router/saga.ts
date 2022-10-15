import { select, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { getNavigation } from './selectors';
import { NavigationContainerRef } from './types';

const redirectToPageWithoutHistory = function* ({ payload }: ReturnType<typeof actions.redirectToPageWithoutHistory>) {
    const navigation: NavigationContainerRef = yield select(getNavigation);

    const currentRoute = navigation?.getCurrentRoute();

    if (currentRoute && currentRoute.name !== payload) {
        navigation?.navigate(payload);
        navigation?.reset({ index: 0, routes: [{ name: payload }] });
    }
};

export const routerSaga = function* () {
    yield takeEvery(getType(actions.redirectToPageWithoutHistory), redirectToPageWithoutHistory);
};
