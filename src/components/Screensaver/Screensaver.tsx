import * as React from 'react';
import { View } from 'react-native';

import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color } from '~/features/ui-kit/constants';

import LogoIcon from '../../../assets/icons/logo.svg';

import { styles } from './styles';

export const Screensaver: React.FC = () => {
    return (
        <View style={styles.layout}>
            <View style={styles.logo}>
                <LogoIcon width={150} height={150} />
                <View style={styles.logoText}>
                    <Text color={color.black} weight={TextWeight.Black} size={TextSize.HelloPage}>
                        BUMP
                    </Text>
                </View>
            </View>
        </View>
    );
};
