import { createAction } from 'typesafe-actions';

import { IUpdateModalWindowItemPayload, ModalWindowName } from './types';

const prefix = 'modal-window';

export const create = createAction(`${prefix}/create`)<IUpdateModalWindowItemPayload>();

export const openByName = createAction(`${prefix}/open-by-name`)<ModalWindowName>();
export const closeByName = createAction(`${prefix}/close-by-name`)<ModalWindowName>();
