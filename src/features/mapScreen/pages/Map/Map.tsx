import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { SafeAreaView } from '~/components/SafeAreaView/SafeAreaView';
import { logout } from '~/features/auth/store/actions';

export const Map: React.FC = () => {
    const dispatch = useDispatch();

    const onClick = React.useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <SafeAreaView>
            <View style={{ flex: 1, backgroundColor: 'blue' }}>
                <TouchableOpacity style={{ marginTop: 100 }} onPress={onClick}>
                    <Text>Выйти</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
