import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { NetworkLayout } from './hocs/NetworkLayout/NetworkLayout';
import { StoreLayout } from './hocs/StoreLayout/StoreLayout';
import { RouterRenderer } from './router/routerRenderer';

const App = () => {
    return (
        <NavigationContainer>
            <NetworkLayout>
                <StoreLayout>
                    <RouterRenderer />
                </StoreLayout>
            </NetworkLayout>
        </NavigationContainer>
    );
};

export default App;
