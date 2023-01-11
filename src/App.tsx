import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ActionSheetManager } from './overlays/ActionSheet/ActionSheet';
import { AuthOverlay } from './overlays/AuthOverlay/AuthOverlay';
import { ModalWindowLayout } from './overlays/ModalWindow/ModalWindowLayout';
import { StoreLayout } from './overlays/StoreLayout/StoreLayout';
import { ToastOverlay } from './overlays/Toast/Toast';
import { RouterRenderer } from './router/routerRenderer';
import { ActivityManager } from './services/ActivityManager/ActivityManager';
import { UpdatesManager } from './services/UpdatesManager/UpdatesManager';

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <StoreLayout>
                    <ActionSheetManager>
                        <ToastOverlay>
                            <ModalWindowLayout>
                                <AuthOverlay>
                                    <ActivityManager>
                                        <UpdatesManager>
                                            <RouterRenderer />
                                        </UpdatesManager>
                                    </ActivityManager>
                                </AuthOverlay>
                            </ModalWindowLayout>
                        </ToastOverlay>
                    </ActionSheetManager>
                </StoreLayout>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

export default App;
