import * as React from 'react';

import { TWView } from '~/features/ui-kit/nativewind/nativeComponents';

import { useScreenLayoutApi } from './hooks';
import { IScreenLayoutProps } from './types';

export const ScreenLayoutDefault: React.FC<IScreenLayoutProps> = ({ children, bgColor }) => {
    const { className } = useScreenLayoutApi({ bgColor, classes: 'h-screen' });

    return <TWView className={className}>{children}</TWView>;
};
