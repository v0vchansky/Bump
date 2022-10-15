import React from 'react';
import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';

import { ModalWindowName } from './store/types';

interface IModalWindowInnerProps {
    withDefaultBackdrop?: boolean;
}

export interface IModalWindowProps {
    name: ModalWindowName;
    children?: React.ReactNode;
    innerProps?: IModalWindowInnerProps;
    bottomSheetProps: Omit<BottomSheetModalProps, 'children'>;
}
export interface IModalWindowLayoutProps {
    children?: React.ReactNode;
}
