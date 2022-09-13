import { AuthPage } from '../features/auth/pages/Auth/Auth';
import { Map } from '../features/mapScreen/pages/Map/Map';

import { PageName } from './pageName';
import { IRoute } from './types';

export const routes: IRoute[] = [
    {
        pageName: PageName.Auth,
        component: AuthPage,
    },
    {
        pageName: PageName.Map,
        component: Map,
    },
];
