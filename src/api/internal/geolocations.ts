import { IGeolocation } from '~/store/geolocation/models';

import { baseInternalRequest } from './baseInternalRequest';

export const setGeolocationsOnServer = (points: IGeolocation[]) => {
    return baseInternalRequest({
        method: 'POST',
        url: '/geolocation/set_geolocations',
        data: {
            points,
        },
    });
};

export const getLastUserLocation = (userUuid: string) => {
    return baseInternalRequest({
        method: 'POST',
        url: '/geolocation/get_last_user_location',
        data: {
            userUuid,
        },
    }).then(res => res.data);
};

export const requestUpdateUsersLocations = (userUuids: string[]) => {
    return baseInternalRequest({
        method: 'POST',
        url: '/geolocation/request_update_users_locations',
        data: {
            userUuids,
        },
    }).then(res => res.data);
};
