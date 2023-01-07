import * as React from 'react';
import { Share, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';

import LogoWhiteIcon from '../../../assets/icons/logo-white.svg';

import { styles } from './styles';

const gradientColors = [color.pink, color.primary];

export const ShareBannerButton: React.FC = () => {
    const onShare = React.useCallback(async () => {
        await Share.share({ message: 'Скачай это приложение' });
    }, []);

    return (
        <TouchableOpacity onPress={onShare} activeOpacity={0.85}>
            <GapView top={gap.m}>
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
            </GapView>
        </TouchableOpacity>
    );
};
