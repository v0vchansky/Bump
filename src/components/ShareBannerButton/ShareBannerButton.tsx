import * as React from 'react';
import { Share, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { getMe } from '~/store/user/selectors/me';

import LogoWhiteIcon from '../../../assets/icons/logo-white.svg';

import { styles } from './styles';

const gradientColors = [color.pink, color.primary];

export const ShareBannerButton: React.FC = () => {
    const me = useSelector(getMe);

    const onShare = React.useCallback(async () => {
        const message = `Мой ник в Bump: ${me?.userName}\nСкачай приложение Bump и делись с друзьями местоположением в режиме реального времени на полностью интерактивной социальной карте.\napp.bump-family.ru`;

        await Share.share({ message });
    }, []);

    return (
        <TouchableOpacity
            onPress={onShare}
            activeOpacity={0.85}
            style={{
                shadowColor: color.primary,
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.39,
                shadowRadius: 8.3,

                elevation: 13,
            }}
        >
            <LinearGradient colors={gradientColors} style={styles.root}>
                <View>
                    <Text color={color.white} size={TextSize.L} weight={TextWeight.Black}>
                        пригласи
                    </Text>
                    <GapView top={gap.xxs} bottom={gap.xs}>
                        <Text color={color.white} size={TextSize.L} weight={TextWeight.Black}>
                            больше друзей
                        </Text>
                    </GapView>
                    <Text color={color.slate200} size={TextSize.S} weight={TextWeight.Regular}>
                        Машу, Витю, Вову, и других
                    </Text>
                </View>
                <LogoWhiteIcon width={48} height={48} />
            </LinearGradient>
        </TouchableOpacity>
    );
};
