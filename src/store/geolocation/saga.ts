import BackgroundGeolocation, { Location } from 'react-native-background-geolocation';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as geolocationsApi from '~/api/internal/geolocations';

import * as actions from './actions';
import { IGeolocation } from './models';
import { getFirstGeolocationPoints, getGeopointsAmount, getShouldSetGeolocationsOnServer } from './selectors';

export const SET_GEOLOCATIONS_CHUNK_SIZE = 100;

const sendGeopoints = function* (points: IGeolocation[]) {
    yield put(actions.setGeolocationRequest());

    try {
        yield call(geolocationsApi.setGeolocationsOnServer, points);

        yield put(actions.setGeolocationSuccess());
    } catch (_e) {
        yield put(actions.setGeolocationError());
    }
};

export const forcePushCurrentGeolocationsOnServer = function* () {
    const position: Location = yield call(BackgroundGeolocation.getCurrentPosition, {
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    });

    try {
        yield call(sendGeopoints, [
            {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                speed: position.coords.speed || 0,
                localTime: new Date(),
                batteryLevel: Math.abs(position.battery.level),
                batteryIsCharging: position.battery.is_charging,
            },
        ]);
    } catch (e) {
        //
    }
};

const setGeolocation = function* ({ payload }: ReturnType<typeof actions.setGeolocation>) {
    try {
        yield put(actions.addNewGeolocationPoint(payload));

        const shouldSetGeolocationsOnServer: boolean = yield select(getShouldSetGeolocationsOnServer);
        const geopointsAmount: number = yield select(getGeopointsAmount);

        if (shouldSetGeolocationsOnServer) {
            // Отправляем чанками по 100 штук (SET_GEOLOCATIONS_CHUNK_SIZE)
            for (let i = 0; i < Math.ceil(geopointsAmount / SET_GEOLOCATIONS_CHUNK_SIZE); i++) {
                const points: IGeolocation[] = yield select(getFirstGeolocationPoints(SET_GEOLOCATIONS_CHUNK_SIZE));

                yield call(sendGeopoints, points);
            }
        }
    } catch (_e) {
        //
    }
};

export const geolocationSaga = function* () {
    yield takeEvery(getType(actions.setGeolocation), setGeolocation);
    yield takeEvery(getType(actions.forcePushCurrentGeolocationsOnServer), forcePushCurrentGeolocationsOnServer);
};
