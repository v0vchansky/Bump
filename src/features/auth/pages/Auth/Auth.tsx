import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// import { styled } from 'nativewind';
// import { TextInputSize } from '~/features/ui-kit/components/TextInput/types';
import { TWView } from '~/features/ui-kit/nativewind/nativeComponents';
import { ScreenLayoutDefault } from '~/hocs/ScreenLayout/ScreenLayout-Default';

import { PageName } from '../../../../router/pageName';
import { IRootStackParamList } from '../../../../router/types';
// import { TextInput } from '../../../ui-kit/components/TextInput/TextInput';

// const StyledText = styled(Text);

export const AuthPage: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<IRootStackParamList>>();

    const onClick = React.useCallback(() => {
        navigation.navigate(PageName.Map);
        navigation.reset({ index: 0, routes: [{ name: PageName.Map }] });
    }, [navigation]);

    return (
        <ScreenLayoutDefault bgColor="bg-white">
            <TWView className="bg-transparent h-screen pb-100 justify-center">
                <TWView>
                    {/* <Text>Страница авторизации</Text> */}
                    <TouchableOpacity onPress={onClick}>
                        <Text>Клац</Text>
                    </TouchableOpacity>
                    {/* <TextInput value="BUMP" size={TextInputSize.S} onChange={() => {}} />
                    <TextInput value="BUMP" size={TextInputSize.M} onChange={() => {}} />
                    <TextInput value="BUMP" size={TextInputSize.L} onChange={() => {}} />
                    <StyledText className="text-4xl font-black">Bump</StyledText>
                    <StyledText className="text-4xl font-regular italic">Bump</StyledText> */}
                </TWView>
            </TWView>
        </ScreenLayoutDefault>
    );
};
