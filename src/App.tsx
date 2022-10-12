import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StoreLayout } from './hocs/StoreLayout/StoreLayout';
import { RouterRenderer } from './router/routerRenderer';

const App = () => {
    return (
        <NavigationContainer>
            <StoreLayout>
                <RouterRenderer />
            </StoreLayout>
        </NavigationContainer>
    );
};

export default App;
