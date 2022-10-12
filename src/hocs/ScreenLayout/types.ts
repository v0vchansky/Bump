import { ReactNode } from 'react';

import { ConstColor } from '~/features/ui-kit/constants/types';

export interface IScreenLayoutProps {
    bgColor: ConstColor;
    children?: ReactNode;
}
