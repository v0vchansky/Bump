import { IRootState } from '..';

import { IUserPosition } from './models';

export const getUsersMarkers = (state: IRootState) => state.map.usersMarkers;

export const getVisibleUsersMarkers = (state: IRootState): Array<Required<IUserPosition>> =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    state.map.usersMarkers.filter(marker => marker.geolocation !== undefined);

export const getUserMarkerByUserUuid = (userUuid: string) => {
    return (state: IRootState) => state.map.usersMarkers.find(marker => marker.userUuid === userUuid);
};

export const getSelectedMarker = (state: IRootState) => state.map.usersMarkers.find(marker => marker.selected);
