import { ApiResponseStatus } from '~/models/apiResponse';

import { IUserRelation } from '../user/models';
import { IRootState } from '..';

export const getSearchResult = (state: IRootState): IUserRelation[] => state.search.users;

export const getResponseStatus = (state: IRootState): ApiResponseStatus => state.search.response;
