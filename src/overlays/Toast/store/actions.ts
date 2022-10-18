import Toast from 'react-native-toast-notifications';
import { createAction } from 'typesafe-actions';

import { IToastShowPayload } from './types';

const prefix = 'toast';

export const create = createAction(`${prefix}/create`)<Toast | null>();

export const show = createAction(`${prefix}/show`)<IToastShowPayload>();
