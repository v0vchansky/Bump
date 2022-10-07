import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// import { Button } from '~/features/ui-kit/components/Button/Button';
// import { IButtonSize, IButtonWidth } from '~/features/ui-kit/components/Button/types';
// import { Text } from '~/features/ui-kit/components/Text/Text';
// import { ITextSize, ITextWeight } from '~/features/ui-kit/components/Text/types';
import { TWImage, TWText, TWView } from '~/features/ui-kit/nativewind/nativeComponents';
import { ScreenLayoutDefault } from '~/hocs/ScreenLayout/ScreenLayout-Default';

import { PageName } from '../../../../router/pageName';
import { IRootStackParamList } from '../../../../router/types';

// import logoWithNameImage from './logo-with-name.png';

export const HelloPage: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<IRootStackParamList>>();

    const onClick = React.useCallback(() => {
        navigation.navigate(PageName.Auth);
        // navigation.reset({ index: 0, routes: [{ name: PageName.Auth }] });
    }, [navigation]);

    return (
        <ScreenLayoutDefault bgColor="bg-pink-50">
            <TWView className="h-full pb-100 justify-center items-center">
                {/* <TWImage source={logoWithNameImage}></TWImage> */}
                <TWView className="w-3/4">
                    {/* <Button
                        isItalicText
                        width={IButtonWidth.Max}
                        size={IButtonSize.XXL}
                        weight={ITextWeight.Black}
                        text="ПОЕХАЛИ"
                        onClick={onClick}
                    /> */}
                    {/* <Text isItalic size={ITextSize.XXL} weight={ITextWeight.Black}>
                        BUMP
                    </Text> */}
                    <TWText className="">BUMP</TWText>
                </TWView>
            </TWView>
        </ScreenLayoutDefault>
    );
};
