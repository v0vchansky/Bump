import React from 'react';

import { PageName } from './pageName';

export interface IRoute {
    pageName: PageName;
    component: React.FC;
}

export type IRootStackParamList = {
    [PageName.HelloPage]: undefined;
    [PageName.Auth]: undefined;
    [PageName.AddProfileInfo]: undefined;
    [PageName.Map]: undefined;
};
