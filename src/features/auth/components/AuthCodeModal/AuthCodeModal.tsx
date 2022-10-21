import * as React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonWidth } from '~/features/ui-kit/components/Button/types';
import { CodeInput } from '~/features/ui-kit/components/CodeInput/CodeInput';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap, rounded } from '~/features/ui-kit/constants';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';

import { submitLogin } from '../../store/actions';

import { AUTH_CODE_MODAL_NAME } from './constants';

const AuthCodeModalContent: React.FC = () => {
    const dispatch = useDispatch();

    const codeLenght = 4;

    const [value, setValue] = React.useState('');

    const onSubmit = React.useCallback(() => {
        dispatch(submitLogin(value));
    }, [dispatch, value]);

    const onChange = React.useCallback(
        (value: string) => {
            if (value.length === codeLenght) {
                dispatch(submitLogin(value));
            }

            setValue(value);
        },
        [dispatch],
    );

    const submitButtonDisabled = value.length < codeLenght;

    return (
        <Container left={gap.xxl} right={gap.xxl}>
            <GapView top={gap.m}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text size={TextSize.XL} weight={TextWeight.Black}>
                        Введите код
                    </Text>
                </View>
            </GapView>
            <GapView top={gap.m}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        padding: gap.m,
                        backgroundColor: color.amber300,
                        borderRadius: rounded['3xs'],
                    }}
                >
                    <Text size={TextSize.L} weight={TextWeight.Regular} align="center">
                        Введите последние 4 цифры номера, с которого мы позвоним
                    </Text>
                </View>
            </GapView>
            <GapView top={gap.l} bottom={gap.l}>
                <CodeInput autoFocus onChange={onChange} codeLength={codeLenght} />
            </GapView>
            <Button
                disabled={submitButtonDisabled}
                isItalicText
                width={IButtonWidth.Max}
                size={IButtonSize.L}
                weight={TextWeight.Black}
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
