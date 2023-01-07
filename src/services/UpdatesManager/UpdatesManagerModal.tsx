import * as React from 'react';
import { Image, Linking, View } from 'react-native';
import VersionCheck from 'react-native-version-check';

import { SafeAreaView } from '~/components/SafeAreaView/SafeAreaView';
import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonWidth } from '~/features/ui-kit/components/Button/types';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';

import RobotTechImage from '../../../assets/images/robot-tech.png';

import { styles } from './styles';

export const UpdatesManagerModal: React.FC = () => {
    const onGoToStore = React.useCallback(async () => {
        try {
            const url = await VersionCheck.getStoreUrl({ ignoreErrors: true });

            Linking.openURL(url);
        } catch (_e) {
            //
        }
    }, []);

    return (
        <SafeAreaView>
            <Container left={gap.l} right={gap.l}>
                <View style={styles.root}>
                    <View style={styles.texts}>
                        <Image style={styles.image} source={RobotTechImage}></Image>
                        <GapView top={gap.xl} bottom={gap.s} left={gap.xxs} right={gap.xxs}>
                            <Text color={color.primary} align="center" size={TextSize.XL} weight={TextWeight.Bold}>
                                Йоу, друг,{'\n'}вышла новая версия{' '}
                                <Text color={color.primary} size={TextSize.XL} weight={TextWeight.Black}>
                                    Bump
                                </Text>
                            </Text>
                        </GapView>

                        <Text color={color.slate600} weight={TextWeight.Bold} align="center">
                            Обновись, и не пропусти{'\n'}новые фичи
                        </Text>
                    </View>
                    <View style={styles.button}>
                        <Button
                            width={IButtonWidth.Max}
                            size={IButtonSize.L}
                            weight={TextWeight.Bold}
                            text="Обновить"
                            onClick={onGoToStore}
                        />
                    </View>
                </View>
            </Container>
        </SafeAreaView>
    );
};
