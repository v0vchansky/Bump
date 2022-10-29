import { IRootState } from '..';

const DEFAULT_MIN_POINTS_FOR_SET_ON_SERVER = 20;

export const getShouldSetGeolocationsOnServer = (state: IRootState) =>
    state.geolocation.points.length >= DEFAULT_MIN_POINTS_FOR_SET_ON_SERVER;
export const getGeolocationPoints = (state: IRootState) => state.geolocation.points;
