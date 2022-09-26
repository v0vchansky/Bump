import { createAction } from 'typesafe-actions';

import { NavigationType } from '../../router/types';

const prefix = 'router';

export const redirectToAuthPage = createAction(`${prefix}/route-to-auth`)();
export const routerUpdateNavigation = createAction(`${prefix}/update-navigation`)<NavigationType>();
