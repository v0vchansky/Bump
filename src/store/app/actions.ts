import { createAction } from 'typesafe-actions';

const prefix = 'app';

export const init = createAction(`${prefix}/init`)();
export const initSuccess = createAction(`${prefix}/init-success`)();
