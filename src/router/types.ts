import React from 'react';

import { PageName } from './pageName';

export interface IRoute {
    pageName: PageName;
    component: React.FC;
}

export type IRootStackParamList = {
    [PageName.Auth]: undefined;
    [PageName.Map]: undefined;
};