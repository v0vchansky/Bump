import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '~/features/auth/store/actions';
import { getLoginRequestStatus, getLoginResponseStartTime } from '~/features/auth/store/selectors';
import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonWidth } from '~/features/ui-kit/components/Button/types';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { TextInput } from '~/features/ui-kit/components/TextInput/TextInput';
import { gap } from '~/features/ui-kit/constants';
import { useCountdown } from '~/hooks/countdown';
import { ApiResponseStatus } from '~/models/apiResponse';
import { validateEmail } from '~/utils/email';

export const AuthForm: React.FC = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState<string>('');
    const [isValid, setIsValid] = React.useState<boolean>(false);

    const requestStatus = useSelector(getLoginRequestStatus);
    const isLoading = requestStatus === ApiResponseStatus.Loading;

    const onChange = React.useCallback((value: string) => {
        setEmail(value.toLocaleLowerCase());
        setIsValid(Boolean(validateEmail(value)));
    }, []);

    const onSubmit = React.useCallback(() => {
        dispatch(login(email));
    }, [dispatch, email]);

    const loginResponseStartTime = useSelector(getLoginResponseStartTime);

    const {
        isInProcess,
        countDown: { minutes, seconds, hours },
    } = useCountdown({ targetDate: loginResponseStartTime, withZeros: true });

    return (
        <>
            <GapView bottom={gap.m}>
                <GapView bottom={gap.m}>
                    <Text align="center" size={TextSize.L} weight={TextWeight.Black}>
                        Укажи свой E-mail,{'\n'}чтобы получить проверочный код
                    </Text>
                </GapView>
                <TextInput size="l" autoFocus withBottomBorder onChange={onChange} value={email} maxLength={40} />
            </GapView>
            <Button
                disabled={!isValid || isInProcess}
                isLoading={isLoading}
                width={IButtonWidth.Max}
                size={IButtonSize.L}
                weight={TextWeight.Regular}
                text={isInProcess ? `${hours} : ${minutes} : ${seconds}` : 'Войти'}
                onClick={onSubmit}
            />
        </>
    );
};
