import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styled } from 'nativewind';

import { TWView } from '~/features/ui-kit/nativewind/nativeComponents';

import { PageName } from '../../../../router/pageName';
import { IRootStackParamList } from '../../../../router/types';
import { TextInput } from '../../../ui-kit/components/TextInput/TextInput';

const StyledText = styled(Text);

export const AuthPage: React.FC = () => {
    // const tw = useTailwind();
    const navigation = useNavigation<NativeStackNavigationProp<IRootStackParamList>>();

    const onClick = React.useCallback(() => {
        navigation.navigate(PageName.Map);
        navigation.reset({ index: 0, routes: [{ name: PageName.Map }] });
    }, [navigation]);

    return (
        <TWView className="bg-transparent">
            <Text>Страница авторизации</Text>
            <TouchableOpacity onPress={onClick}>
                <Text>Клац</Text>
            </TouchableOpacity>
            <TextInput value="ыыы" onChange={() => {}} />
            <StyledText className="text-4xl font-black font-[TTDaysSans-Black]">Bump</StyledText>
            <StyledText className="text-4xl font-regular">Bump</StyledText>
        </TWView>
    );
};
