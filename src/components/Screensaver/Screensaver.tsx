import * as React from 'react';
import { Image, View } from 'react-native';

import { Text } from '~/features/ui-kit/components/Text/Text';
import { color } from '~/features/ui-kit/constants';

import ScreensaverLogo from '../../../assets/images/screensaver-logo.png';
import { SafeAreaView } from '../SafeAreaView/SafeAreaView';

import { styles } from './styles';

export const Screensaver: React.FC = () => {
    return (
        <View style={styles.layout}>
            <SafeAreaView>
                <View style={styles.content}>
                    <Image source={ScreensaverLogo} style={styles.image} />
                    <Text color={color.white}>Powered by Tikhonov Digital</Text>
                </View>
            </SafeAreaView>
        </View>
    );
};
