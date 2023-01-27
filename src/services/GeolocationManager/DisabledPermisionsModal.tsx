import * as React from 'react';
import { Image, View } from 'react-native';

import { SafeAreaView } from '~/components/SafeAreaView/SafeAreaView';
import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonWidth } from '~/features/ui-kit/components/Button/types';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';

import MonsterSearchers from '../../../assets/images/monster-searchers.png';

import { useGeolocationManager } from './GeolocationManager';
import { styles } from './styles';

export const DisabledPermisionsModal: React.FC = () => {
    const geolocationManager = useGeolocationManager();

    return (
        <View style={styles.layout}>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <GapView bottom={gap.l}>
                            <Text size={TextSize.XL} color={color.slate50} weight={TextWeight.Bold} align="center">
                                Йоу, включи постоянную геолокацию
                            </Text>
                        </GapView>
                        <Image source={MonsterSearchers} style={styles.image} />
                        <View style={styles.buttonContainer}>
                            <Button
                                width={IButtonWidth.Max}
                                size={IButtonSize.L}
                                weight={TextWeight.Regular}
                                onClick={geolocationManager.requestPermission}
                                text="Открыть настройки"
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};
