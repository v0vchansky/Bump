import { createAction } from 'typesafe-actions';

import { IAuthLogin } from '../../features/auth/models/auth';

import { IOperationsPayload } from './types';

const prefix = 'test';

export const operation = createAction(`${prefix}/operation`)<IOperationsPayload>();
export const plus = createAction(`${prefix}/plus`)<IAuthLogin>();
export const minus = createAction(`${prefix}/minus`)();
