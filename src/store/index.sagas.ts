import { call } from 'redux-saga/effects';

import { routerSaga } from './router/saga';
import { testSaga } from './test/saga';

const sagas = [testSaga, routerSaga];

export const rootSaga = function* () {
    yield sagas.map(call);
};
