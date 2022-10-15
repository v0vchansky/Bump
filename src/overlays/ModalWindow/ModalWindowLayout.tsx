import React from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { modalWindowRegistry } from './modalWindowRegistry';
import { IModalWindowLayoutProps } from './types';

export const ModalWindowLayout: React.FC<IModalWindowLayoutProps> = ({ children }) => {
    return (
        <BottomSheetModalProvider>
            {children}
            {modalWindowRegistry.map((Modal, key) => (
                <Modal key={key} />
            ))}
        </BottomSheetModalProvider>
    );
};
