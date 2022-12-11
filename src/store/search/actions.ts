import { createAction } from 'typesafe-actions';

import { IFullUser, IUserRelation } from '../user/models';

import { IProfilesStackItem, IUpdateRelationsPayload } from './models';

const prefix = 'search';

export const reset = createAction(`${prefix}/reset`)();

export const searchByUsername = createAction(`${prefix}/search-by-username`)<string>();
export const searchByUsernameRequest = createAction(`${prefix}/search-by-username-request`)();
export const searchByUsernameSuccess = createAction(`${prefix}/search-by-username-success`)<IUserRelation[]>();
export const searchByUsernameError = createAction(`${prefix}/search-by-username-error`)();
export const updateSearchResultRelations = createAction(
    `${prefix}/update-search-result-relations`,
)<IUpdateRelationsPayload>();

export const openProfile = createAction(`${prefix}/open-profile`)<IFullUser>();
export const nextProfile = createAction(`${prefix}/next-profile`)<IFullUser>();
export const updateProfilesStackRelations = createAction(`${prefix}/update-profiles-stack-relations`)<
    IUpdateRelationsPayload & { myUuid: string }
>();
export const addNextProfile = createAction(`${prefix}/add-next-profile`)<IFullUser>();
export const prevProfile = createAction(`${prefix}/prev-profile`)();
export const prevProfileSuccess = createAction(`${prefix}/prev-profile-success`)();
export const resetProfilesStack = createAction(`${prefix}/reset-profiles-stack`)();

export const forceUpdateUserInStack = createAction(`${prefix}/force-update-user-in-stack`)<string>();
export const forceUpdateUserInStackSuccess = createAction(`${prefix}/force-update-user-in-stack-success`)<IFullUser>();

export const getProfileRequest = createAction(`${prefix}/get-profile-request`)();
export const getProfileSuccess = createAction(`${prefix}/get-profile-success`)<IProfilesStackItem>();
export const getProfileError = createAction(`${prefix}/get-profile-error`)();
