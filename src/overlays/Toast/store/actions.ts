import type { ToastShowParams } from 'react-native-toast-message/lib/src/types';
import { createAction } from 'typesafe-actions';

const prefix = 'toast';

export const show = createAction(`${prefix}/show`)<ToastShowParams>();
