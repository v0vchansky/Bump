import React, { ComponentType } from 'react';
import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';

import { ModalWindow } from './ModalWindow';

export const withModalWindow = (
    name: string,
    bottomSheetProps: Omit<BottomSheetModalProps, 'children'>,
    Content: React.ElementType,
): ComponentType => {
    const Component = React.forwardRef(() => {
        return (
            <ModalWindow name={name} bottomSheetProps={bottomSheetProps}>
                <Content />
            </ModalWindow>
        );
    });

    const componentName = Component.displayName || Component.name || 'Component';

    Component.displayName = `ModalComponent(${componentName})`;

    return Component;
};
