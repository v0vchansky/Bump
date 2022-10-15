import { select, takeEvery } from 'redux-saga/effects';
import type { ActionType } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { getModalInstanceSelector } from './selectors';
import { ModalWindowRef } from './types';

const openByName = function* ({ payload }: ActionType<typeof actions.openByName>) {
    const modal: ModalWindowRef = yield select(getModalInstanceSelector(payload));

    modal.current?.present();
};

const closeByName = function* ({ payload }: ActionType<typeof actions.closeByName>) {
    const modal: ModalWindowRef = yield select(getModalInstanceSelector(payload));

    modal.current?.dismiss();
};

export const modalWindowSaga = function* () {
    yield takeEvery(getType(actions.openByName), openByName);
    yield takeEvery(getType(actions.closeByName), closeByName);
};
