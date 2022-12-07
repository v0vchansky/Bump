import { createAction } from 'typesafe-actions';

import { IUserRelation } from '../user/models';

const prefix = 'search';

export const reset = createAction(`${prefix}/reset`)();

export const searchByUsername = createAction(`${prefix}/search-by-username`)<string>();
export const searchByUsernameRequest = createAction(`${prefix}/search-by-username-request`)();
export const searchByUsernameSuccess = createAction(`${prefix}/search-by-username-success`)<IUserRelation[]>();
export const searchByUsernameError = createAction(`${prefix}/search-by-username-error`)();
