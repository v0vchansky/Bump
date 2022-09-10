import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { TestComponent } from './components/TestComponent';
import { createAppStore } from './store/create-app-store';

const store = createAppStore();

const App = () => {
    return (
        <Provider store={store}>
            <View>
                <NavigationContainer>
                    <TestComponent />
                </NavigationContainer>
            </View>
        </Provider>
    );
};

export default App;
