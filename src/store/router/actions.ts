import { createAction } from 'typesafe-actions';

import { PageName } from '~/router/pageName';

import { NavigationContainerRef } from './types';

const prefix = 'router';

export const routerUpdateNavigation = createAction(`${prefix}/update-navigation`)<NavigationContainerRef>();

export const redirectToPageWithoutHistory = createAction(`${prefix}/route-to-page-without-history`)<PageName>();
