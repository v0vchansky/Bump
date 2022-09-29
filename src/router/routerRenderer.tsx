import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { routes } from './routes';
import { IRootStackParamList } from './types';

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'transparent',
    },
});

const Stack = createNativeStackNavigator<IRootStackParamList>();

export const RouterRenderer: React.FC = () => {
    return (
        <Stack.Navigator>
            {routes.map(({ pageName, component }, key) => {
                return (
                    <Stack.Screen
                        options={{
                            headerShown: false,
                            contentStyle: styles.content,
                        }}
                        key={key}
                        name={pageName}
                        component={component}
                    />
                );
            })}
        </Stack.Navigator>
    );
};
