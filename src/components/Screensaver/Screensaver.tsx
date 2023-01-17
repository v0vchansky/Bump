import * as React from 'react';
import { Image, View } from 'react-native';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { color, gap } from '~/features/ui-kit/constants';

import ScreensaverLogo from '../../../assets/images/screensaver-logo.png';
import { SafeAreaView } from '../SafeAreaView/SafeAreaView';

import { styles } from './styles';

export const Screensaver: React.FC = () => {
    return (
        <View style={styles.layout}>
            <SafeAreaView>
                <View style={styles.content}>
                    <Image source={ScreensaverLogo} style={styles.image} />
                    <GapView bottom={gap.l}>
                        <Text color={color.white}>Powered by Tikhonov Digital</Text>
                    </GapView>
                </View>
            </SafeAreaView>
        </View>
    );
};
