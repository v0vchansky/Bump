import * as React from 'react';
import { useSelector } from 'react-redux';

import { getLoginResponseStartTime } from '~/features/auth/store/selectors';
import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonWidth } from '~/features/ui-kit/components/Button/types';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { PhoneInput } from '~/features/ui-kit/components/PhoneInput/PhoneInput';
import { TextWeight } from '~/features/ui-kit/components/Text/types';
import { gap } from '~/features/ui-kit/constants';
import { useCountdown } from '~/hooks/countdown';

import { initialValues } from './constants';
import { useAuthFormApi } from './hooks';

export const AuthForm: React.FC = () => {
    const { isLoading, isValid, onChange, onSubmit } = useAuthFormApi();

    const loginResponseStartTime = useSelector(getLoginResponseStartTime);

    const {
        isInProcess,
        countDown: { minutes, seconds, hours },
    } = useCountdown({ targetDate: loginResponseStartTime, withZeros: true });

    return (
        <>
            <GapView bottom={gap.m}>
                <PhoneInput autoFocus initialData={initialValues} onChange={onChange} />
            </GapView>
            <Button
                disabled={!isValid || isInProcess}
                isLoading={isLoading}
                isItalicText
                width={IButtonWidth.Max}
                size={IButtonSize.L}
                weight={isInProcess ? TextWeight.Bold : TextWeight.Black}
                text={isInProcess ? `${hours} : ${minutes} : ${seconds}` : 'Войти'}
                onClick={onSubmit}
            />
        </>
    );
};
