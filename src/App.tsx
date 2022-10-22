import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import YaMap from 'react-native-yamap';

import { AuthOverlay } from './overlays/AuthOverlay/AuthOverlay';
import { ModalWindowLayout } from './overlays/ModalWindow/ModalWindowLayout';
import { StoreLayout } from './overlays/StoreLayout/StoreLayout';
import { ToastOverlay } from './overlays/Toast/Toast';
import { RouterRenderer } from './router/routerRenderer';

YaMap.init('675eb296-5aae-4d09-9c1f-e8a17e336e22');

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <StoreLayout>
                    <ToastOverlay>
                        <ModalWindowLayout>
                            <AuthOverlay>
                                <RouterRenderer />
                            </AuthOverlay>
                        </ModalWindowLayout>
                    </ToastOverlay>
                </StoreLayout>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

export default App;
