import { call } from 'redux-saga/effects';

import { authSaga } from '~/features/auth/store/sagas';
import { modalWindowSaga } from '~/overlays/ModalWindow/store/sagas';
import { toastSaga } from '~/overlays/Toast/store/sagas';

import { appSaga } from './app/sagas';
import { geolocationSaga } from './geolocation/saga';
import { routerSaga } from './router/saga';
import { searchSaga } from './search/saga';
import { shadowActionsSaga } from './shadowActions/sagas';
import { userSaga } from './user/sagas';

const sagas = [
    routerSaga,
    modalWindowSaga,
    authSaga,
    toastSaga,
    geolocationSaga,
    userSaga,
    searchSaga,
    appSaga,
    shadowActionsSaga,
];

export const rootSaga = function* () {
    yield sagas.map(call);
};
