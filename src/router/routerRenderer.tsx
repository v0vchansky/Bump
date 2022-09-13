import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { routes } from './routes';
import { IRootStackParamList } from './types';

const Stack = createNativeStackNavigator<IRootStackParamList>();

export const RouterRenderer: React.FC = () => {
    return (
        <Stack.Navigator>
            {routes.map(({ pageName, component }, key) => {
                return (
                    <Stack.Screen options={{ headerShown: false }} key={key} name={pageName} component={component} />
                );
            })}
        </Stack.Navigator>
    );
};
