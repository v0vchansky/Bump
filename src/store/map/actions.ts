import { createAction } from 'typesafe-actions';

import { IUserPosition } from './models';

const prefix = 'map';

export const init = createAction(`${prefix}/init`)();
export const update = createAction(`${prefix}/update`)();

export const requestUpdateUserLocation = createAction(`${prefix}/request-update-user-location`)<string>();

export const updateLastUserLocation = createAction(`${prefix}/update-last-user-location`)<string>();

export const addUserMarker = createAction(`${prefix}/add-user-marker`)<IUserPosition>();
export const updateUserMarker = createAction(`${prefix}/update-user-marker`)<IUserPosition>();
export const deleteUserMarker = createAction(`${prefix}/delete-user-marker`)<string>();

export const updateAllMarkers = createAction(`${prefix}/update-all-markers`)();

export const selectMarker = createAction(`${prefix}/select-marker`)<string>();
export const deselectMarkers = createAction(`${prefix}/deselect-markers`)();
