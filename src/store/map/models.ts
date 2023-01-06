import { ApiResponseStatus } from '~/models/apiResponse';

import { IGeolocation } from '../geolocation/models';

export interface IRegion {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export interface IUserPosition {
    geolocation?: IGeolocation;
    userUuid: string;
    selected: boolean;
    response: ApiResponseStatus;
}
