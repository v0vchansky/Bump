import { createAction } from 'typesafe-actions';

const prefix = 'shadow-actions';

export const runAction = createAction(`${prefix}/run-action`)<string>();
