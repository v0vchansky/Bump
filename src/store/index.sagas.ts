import { call } from 'redux-saga/effects';

import { authSaga } from '~/features/auth/store/sagas';
import { modalWindowSaga } from '~/overlays/ModalWindow/store/sagas';
import { toastSaga } from '~/overlays/Toast/store/sagas';

import { routerSaga } from './router/saga';

const sagas = [routerSaga, modalWindowSaga, authSaga, toastSaga];

export const rootSaga = function* () {
    yield sagas.map(call);
};
