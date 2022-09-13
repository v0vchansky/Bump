import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { PageName } from '../../../../router/pageName';
import { IRootStackParamList } from '../../../../router/types';

export const AuthPage: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<IRootStackParamList>>();

    const onClick = React.useCallback(() => {
        navigation.navigate(PageName.Map);
        navigation.reset({ index: 0, routes: [{ name: PageName.Map }] });
    }, [navigation]);

    return (
        <View style={{ marginTop: 100 }}>
            <Text>Страница авторизации</Text>
            <TouchableOpacity onPress={onClick}>
                <Text>Клац</Text>
            </TouchableOpacity>
        </View>
    );
};
