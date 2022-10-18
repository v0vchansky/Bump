import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StoreLayout } from './hocs/StoreLayout/StoreLayout';
import { AuthOverlay } from './overlays/AuthOverlay/AuthOverlay';
import { ModalWindowLayout } from './overlays/ModalWindow/ModalWindowLayout';
import { ToastOverlay } from './overlays/Toast/Toast';
import { RouterRenderer } from './router/routerRenderer';

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StoreLayout>
                <ToastOverlay>
                    <ModalWindowLayout>
                        <AuthOverlay>
                            <RouterRenderer />
                        </AuthOverlay>
                    </ModalWindowLayout>
                </ToastOverlay>
            </StoreLayout>
        </GestureHandlerRootView>
    );
};

export default App;
