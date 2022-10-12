import * as React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonWidth } from '~/features/ui-kit/components/Button/types';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { ScreenLayoutDefault } from '~/hocs/ScreenLayout/ScreenLayout-Default';

import LogoIcon from '../../../../../assets/icons/logo.svg';
import { PageName } from '../../../../router/pageName';
import { IRootStackParamList } from '../../../../router/types';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';

import { styles } from './styles';

export const HelloPage: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<IRootStackParamList>>();

    const onClick = React.useCallback(() => {
        navigation.navigate(PageName.Auth);
        navigation.reset({ index: 0, routes: [{ name: PageName.Auth }] });
    }, [navigation]);

    return (
        <ScreenLayoutDefault bgColor={color.pink50}>
            <AuthLayout>
                <View style={styles.logo}>
                    <LogoIcon width={150} height={150} />
                    <View style={styles.logoText}>
                        <Text color={color.black} weight={TextWeight.Black} size={TextSize.HelloPage}>
                            BUMP
                        </Text>
                    </View>
                </View>
                <GapView top={gap['8xl'] * 2.2}>
                    <Button
                        isItalicText
                        width={IButtonWidth.Max}
                        size={IButtonSize.L}
                        weight={TextWeight.Black}
                        text="НАЧАТЬ"
                        onClick={onClick}
                    />
                </GapView>
            </AuthLayout>
        </ScreenLayoutDefault>
    );
};
