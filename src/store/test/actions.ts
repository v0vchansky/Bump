// import { createAction } from '@reduxjs/toolkit';

import { createAction } from 'typesafe-actions';

import { IOperationsPayload } from './types';

const prefix = 'test';

export const operation = createAction(`${prefix}/operation`)<IOperationsPayload>();
export const plus = createAction(`${prefix}/plus`)();
export const minus = createAction(`${prefix}/minus`)();
