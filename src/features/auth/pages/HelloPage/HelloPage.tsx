import * as React from 'react';
import { Linking, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';

import { SafeAreaView } from '~/components/SafeAreaView/SafeAreaView';
import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonType, IButtonWidth } from '~/features/ui-kit/components/Button/types';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { redirectToPageWithoutHistory } from '~/store/router/actions';

import LogoIcon from '../../../../../assets/icons/logo-white.svg';
import { PageName } from '../../../../router/pageName';

import { styles } from './styles';

export const HelloPage: React.FC = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        SplashScreen.hide();
    }, []);

    const onClick = React.useCallback(() => {
        dispatch(redirectToPageWithoutHistory(PageName.Auth));
    }, [dispatch]);

    const onRules = React.useCallback(() => {
        Linking.openURL('https://rules.bump-family.ru/')
    }, []);

    const onPrivacy = React.useCallback(() => {
        Linking.openURL('https://privacy.bump-family.ru/')
    }, []);

    return (
        <View style={styles.root}>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.logo}>
                            <LogoIcon width={150} height={150} />
                            <View style={styles.logoText}>
                                <Text color={color.white} weight={TextWeight.Black} size={TextSize.HelloPage}>
                                    BUMP
                                </Text>
                            </View>
                        </View>
                        <GapView bottom={gap['l']}>
                            <View
                                style={{
                                    shadowColor: color.white,
                                    shadowOffset: {
                                        width: 0,
                                        height: 8,
                                    },
                                    shadowOpacity: 0.46,
                                    shadowRadius: 11.14,

                                    elevation: 17,
                                }}
                            >
                                <Button
                                    width={IButtonWidth.Max}
                                    size={IButtonSize.L}
                                    weight={TextWeight.Regular}
                                    type={IButtonType.White}
                                    text="Начать"
                                    onClick={onClick}
                                />
                            </View>
                            <GapView top={gap.m}>
                                <Text align='center' color={color.white}>Продолжая ты соглашаешься с <Text onPress={onRules} align='center' isUnderline color={color.white}>правилами пользования</Text> и <Text align='center' onPress={onPrivacy} isUnderline color={color.white}>политикой конфиденциальности</Text></Text>
                            </GapView>
                        </GapView>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};
