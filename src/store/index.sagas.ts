import { call } from 'redux-saga/effects';

import { authSaga } from '~/features/auth/store/sagas';
import { modalWindowSaga } from '~/overlays/ModalWindow/store/sagas';

import { routerSaga } from './router/saga';

const sagas = [routerSaga, modalWindowSaga, authSaga];

export const rootSaga = function* () {
    yield sagas.map(call);
};
