import { ApiResponseStatus } from '~/models/apiResponse';

import { IUserRelation } from '../user/models';
import { IRootState } from '..';

import { IProfilesStackItem } from './models';

export const getSearchResult = (state: IRootState): IUserRelation[] => state.search.users;

export const getResponseStatus = (state: IRootState): ApiResponseStatus => state.search.response;

// ProfileStack
export const getProfilesStack = (state: IRootState): IProfilesStackItem[] => state.search.profilesStack;
export const getProfileStackResponseStatus = (state: IRootState) => state.search.profilesStackResponse;
export const getShouldOpenProfileModal = (state: IRootState) => state.search.profilesStack.length === 0;
