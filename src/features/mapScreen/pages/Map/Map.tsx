import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TestComponent } from '../../../../components/TestComponent';
import { PageName } from '../../../../router/pageName';
import { IRootStackParamList } from '../../../../router/types';

export const Map: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<IRootStackParamList>>();

    const onClick = React.useCallback(() => {
        navigation.navigate(PageName.Auth);
        navigation.reset({ index: 0, routes: [{ name: PageName.Auth }] });
    }, [navigation]);

    return (
        <View>
            <TestComponent />
            <TouchableOpacity onPress={onClick}>
                <Text>Клац</Text>
            </TouchableOpacity>
        </View>
    );
};
