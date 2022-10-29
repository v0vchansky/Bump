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
