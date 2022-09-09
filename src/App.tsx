import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import { TestComponent } from './components/TestComponent';
import { createAppStore } from './store/create-app-store';

const store = createAppStore();

const App = () => {
    return (
        <Provider store={store}>
            <View>
                <TestComponent />
            </View>
        </Provider>
    );
};

export default App;
