import * as React from 'react';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { gap } from '~/features/ui-kit/constants';

import { IAuthTitleProps } from './types';

export const AuthTitle: React.FC<IAuthTitleProps> = ({ children }) => {
    return (
        <GapView bottom={gap.s}>
            <Text size={TextSize.XL} weight={TextWeight.Black}>
                {children}
            </Text>
        </GapView>
    );
};
