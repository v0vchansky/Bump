import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { NetworkLayout } from './hocs/NetworkLayout/NetworkLayout';
import { RouterRenderer } from './router/routerRenderer';
import { createAppStore } from './store/create-app-store';

const store = createAppStore();

const App = () => {
    return (
        <NavigationContainer>
            <NetworkLayout>
                <Provider store={store}>
                    <RouterRenderer />
                </Provider>
            </NetworkLayout>
        </NavigationContainer>
    );
};

export default App;
