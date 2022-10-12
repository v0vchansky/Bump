import { ReactNode } from 'react';

import { ConstGap } from '../../constants/types';

export interface IGapViewProps {
    children?: ReactNode;
    top?: ConstGap;
    right?: ConstGap;
    bottom?: ConstGap;
    left?: ConstGap;
}
