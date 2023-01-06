import { createAction } from 'typesafe-actions';

import { ISetGeolocationPayload } from './models';

const prefix = 'geolocation';

export const addNewGeolocationPoint = createAction(`${prefix}/add-new-geolocation-point`)<ISetGeolocationPayload>();

export const setGeolocation = createAction(`${prefix}/set-geolocation`)<ISetGeolocationPayload>();
export const setGeolocationRequest = createAction(`${prefix}/set-geolocation-request`)();
export const setGeolocationSuccess = createAction(`${prefix}/set-geolocation-success`)();
export const setGeolocationError = createAction(`${prefix}/set-geolocation-error`)();
