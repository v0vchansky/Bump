import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as geolocationsApi from '~/api/internal/geolocations';

import * as actions from './actions';
import { IGeolocation } from './models';
import { getGeolocationPoints, getShouldSetGeolocationsOnServer } from './selectors';

const setGeolocation = function* ({ payload }: ReturnType<typeof actions.setGeolocation>) {
    yield put(actions.addNewGeolocationPoint(payload));
    const shouldSetGeolocationsOnServer: boolean = yield select(getShouldSetGeolocationsOnServer);

    if (shouldSetGeolocationsOnServer) {
        try {
            const points: IGeolocation[] = yield select(getGeolocationPoints);

            yield call(geolocationsApi.setGeolocationsOnServer, points);

            yield put(actions.setGeolocationSuccess());
        } catch (_e) {
            yield put(actions.setGeolocationError());
        }
    }
};

export const geolocationSaga = function* () {
    yield takeEvery(getType(actions.setGeolocation), setGeolocation);
};
