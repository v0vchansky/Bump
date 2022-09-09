import { call } from 'redux-saga/effects';

import { testSaga } from './test/saga';

const sagas = [testSaga];

export const rootSaga = function* () {
    yield sagas.map(call);
};
