import * as React from 'react';
import { View } from 'react-native';

import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonWidth } from '~/features/ui-kit/components/Button/types';
import { CodeInput } from '~/features/ui-kit/components/CodeInput/CodeInput';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { gap } from '~/features/ui-kit/constants';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';

import { AUTH_CODE_MODAL_NAME } from './constants';
import { codeLenght, useAuthCodeModalApi } from './hooks';
import { styles } from './styles';

const AuthCodeModalContent: React.FC = () => {
    const { isLoading, submitButtonDisabled, onSubmit, onChange, onPress } = useAuthCodeModalApi();

    return (
        <Container left={gap.xxl} right={gap.xxl}>
            <GapView top={gap.m}>
                <View style={styles.modalTitle}>
                    <Text size={TextSize.XL} weight={TextWeight.Black}>
                        Введи код из письма
                    </Text>
                </View>
            </GapView>
            <GapView top={gap.l} bottom={gap.l}>
                <CodeInput onPress={onPress} autoFocus onChange={onChange} codeLength={codeLenght} />
            </GapView>
            <Button
                disabled={submitButtonDisabled}
                isLoading={isLoading}
                width={IButtonWidth.Max}
                size={IButtonSize.L}
                weight={TextWeight.Regular}
                text="Продолжить"
                onClick={onSubmit}
            />
        </Container>
    );
};

export const AuthCodeModal = withModalWindow(
    AUTH_CODE_MODAL_NAME,
    { index: 1, snapPoints: ['50%', '85%'], enablePanDownToClose: false },
    AuthCodeModalContent,
);
