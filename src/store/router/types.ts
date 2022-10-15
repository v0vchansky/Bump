import type { NavigationContainerRefWithCurrent } from '@react-navigation/native';

import { IRootStackParamList } from '~/router/types';

export type NavigationContainerRef = NavigationContainerRefWithCurrent<IRootStackParamList> | null;
