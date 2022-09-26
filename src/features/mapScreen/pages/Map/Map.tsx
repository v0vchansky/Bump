import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { TestComponent } from '../../../../components/TestComponent';
import { redirectToAuthPage } from '../../../../store/router/actions';

export const Map: React.FC = () => {
    const dispatch = useDispatch();

    const onClick = React.useCallback(() => {
        dispatch(redirectToAuthPage());
    }, [dispatch]);

    return (
        <View>
            <TestComponent />
            <TouchableOpacity onPress={onClick}>
                <Text>Клац</Text>
            </TouchableOpacity>
        </View>
    );
};
