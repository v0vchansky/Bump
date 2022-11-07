import { ApiResponseStatus } from '~/models/apiResponse';

import { IRootState } from '..';

const DEFAULT_MIN_POINTS_FOR_SEND_ON_SERVER = 30;

export const getShouldSetGeolocationsOnServer = (state: IRootState) =>
    state.geolocation.points.length >= DEFAULT_MIN_POINTS_FOR_SEND_ON_SERVER &&
    state.geolocation.setGeolocationResponse !== ApiResponseStatus.Loading;

export const getGeopointsAmount = (state: IRootState) => state.geolocation.points.length;

export const getFirstGeolocationPoints = (amount: number) => {
    return (state: IRootState) => state.geolocation.points.slice(0, amount);
};
