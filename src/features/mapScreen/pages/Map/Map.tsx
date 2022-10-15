import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { logout } from '~/features/auth/store/actions';

import { TestComponent } from '../../../../components/TestComponent';

export const Map: React.FC = () => {
    const dispatch = useDispatch();

    const onClick = React.useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <View>
            <TestComponent />
            <TouchableOpacity onPress={onClick}>
                <Text>Выйти</Text>
            </TouchableOpacity>
        </View>
    );
};
