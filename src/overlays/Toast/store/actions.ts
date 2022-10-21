import { createAction } from 'typesafe-actions';

import { IToastShowParams } from './types';

const prefix = 'toast';

export const show = createAction(`${prefix}/show`)<IToastShowParams>();
export const close = createAction(`${prefix}/close`)();
