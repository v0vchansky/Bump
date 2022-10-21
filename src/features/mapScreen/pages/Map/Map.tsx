import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { logout } from '~/features/auth/store/actions';

export const Map: React.FC = () => {
    const dispatch = useDispatch();

    const onClick = React.useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
            <View style={{ flex: 1, backgroundColor: 'blue' }}>
                <TouchableOpacity style={{ marginTop: 100 }} onPress={onClick}>
                    <Text>Выйти</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
