import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { PageName } from './pageName';

export interface IRoute {
    pageName: PageName;
    component: React.FC;
}

export type IRootStackParamList = {
    [PageName.Auth]: undefined;
    [PageName.Map]: undefined;
};

export type NavigationType = NativeStackNavigationProp<IRootStackParamList, keyof IRootStackParamList, undefined>;
