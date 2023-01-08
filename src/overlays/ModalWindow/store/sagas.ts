import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { select, takeEvery } from 'redux-saga/effects';
import type { ActionType } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { getModalInstanceSelector } from './selectors';

export const openByName = function* ({ payload }: ActionType<typeof actions.openByName>) {
    const modal: BottomSheetModalMethods | null = yield select(getModalInstanceSelector(payload));

    modal?.present();
};

export const closeByName = function* ({ payload }: ActionType<typeof actions.closeByName>) {
    const modal: BottomSheetModalMethods | null = yield select(getModalInstanceSelector(payload));

    modal?.dismiss();
};

export const modalWindowSaga = function* () {
    yield takeEvery(getType(actions.openByName), openByName);
    yield takeEvery(getType(actions.closeByName), closeByName);
};
