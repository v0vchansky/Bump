import Toast from 'react-native-toast-notifications';
import { select, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { getToast } from './selectors';

const show = function* ({ payload }: ReturnType<typeof actions.show>) {
    const toast: Toast | null = yield select(getToast);

    if (toast) {
        toast.show(payload.message, payload.options);
    }
};

export const toastSaga = function* () {
    yield takeEvery(getType(actions.show), show);
};
