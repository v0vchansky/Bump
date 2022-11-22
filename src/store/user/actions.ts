import { createAction } from 'typesafe-actions';

import { ISetUserProfileInfoPayload, IUser } from './models';

const prefix = 'user';

export const init = createAction(`${prefix}/init`)<IUser>();

export const setUserProfileInfo = createAction(`${prefix}/set-user-profile-info`)<ISetUserProfileInfoPayload>();

export const reset = createAction(`${prefix}/reset`)();
