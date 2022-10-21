import Toast from 'react-native-toast-message';
import { takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as actions from './actions';

const show = function* ({ payload }: ReturnType<typeof actions.show>) {
    yield Toast.show(payload);
};

export const toastSaga = function* () {
    yield takeEvery(getType(actions.show), show);
};
