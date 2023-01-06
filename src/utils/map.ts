import { BoundingBox, Camera } from 'react-native-maps';

import { IMarker } from '~/features/mapScreen/components/Marker/types';

const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
};

const square = (x: number) => {
    return Math.pow(x, 2);
};

export const haversineDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const r = 6371;

    lat1 = deg2rad(lat1);
    lat2 = deg2rad(lat2);

    const lat_dif = lat2 - lat1;
    const lng_dif = deg2rad(lng2 - lng1);

    const a = square(Math.sin(lat_dif / 2)) + Math.cos(lat1) * Math.cos(lat2) * square(Math.sin(lng_dif / 2));
    const d = 2 * r * Math.asin(Math.sqrt(a));

    return Math.round((d + Number.EPSILON) * 100) / 100;
};

interface IPoint {
    latitude: number;
    longitude: number;
}

const findNearestMarker = (sourcePoint: IPoint, markers: IMarker[]) => {
    if (!markers.length) return;

    return markers.sort(
        (a, b) =>
            haversineDistance(sourcePoint.latitude, sourcePoint.longitude, a.latitude, a.longitude) -
            haversineDistance(sourcePoint.latitude, sourcePoint.longitude, b.latitude, b.longitude),
    )[0];
};

export const calculateFocusedMarker = (mapBoundaries: BoundingBox, camera: Camera, markers: IMarker[]) => {
    const nearestMarker = findNearestMarker(camera.center, markers);

    if (nearestMarker) {
        const latDelta = mapBoundaries.northEast.latitude - mapBoundaries.southWest.latitude;
        const lonDelta = mapBoundaries.northEast.longitude - mapBoundaries.southWest.longitude;

        const partOfHalfScreen = 0.6;

        const latCoeff = (latDelta / 2) * partOfHalfScreen;
        const lonCoeff = (lonDelta / 2) * partOfHalfScreen;

        const zoomToMarkerBox = {
            maxLatitude: camera.center.latitude + latCoeff,
            maxLongitude: camera.center.longitude + lonCoeff,
            minLatitude: camera.center.latitude - latCoeff,
            minLongitude: camera.center.longitude - lonCoeff,
        };

        if (
            nearestMarker.latitude < zoomToMarkerBox.maxLatitude &&
            nearestMarker.latitude > zoomToMarkerBox.minLatitude &&
            nearestMarker.longitude < zoomToMarkerBox.maxLongitude &&
            nearestMarker.longitude > zoomToMarkerBox.minLongitude
        ) {
            return nearestMarker;
        }
    }

    return null;
};
