import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { RouterRenderer } from './router/routerRenderer';
import { createAppStore } from './store/create-app-store';

const store = createAppStore();

const App = () => {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <RouterRenderer />
            </Provider>
        </NavigationContainer>
    );
};

export default App;
