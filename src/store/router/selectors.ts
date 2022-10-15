import { IRootState } from '..';

import { NavigationContainerRef } from './types';

export const getNavigation = (state: IRootState): NavigationContainerRef => state.router.navigation;
