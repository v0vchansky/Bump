import * as React from 'react';

import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonWidth } from '~/features/ui-kit/components/Button/types';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { PhoneInput } from '~/features/ui-kit/components/PhoneInput/PhoneInput';
import { TextWeight } from '~/features/ui-kit/components/Text/types';
import { gap } from '~/features/ui-kit/constants';

import { initialValues } from './constants';
import { useAuthFormApi } from './hooks';

export const AuthForm: React.FC = () => {
    const { isValid, onChange, onSubmit } = useAuthFormApi();

    return (
        <>
            <GapView bottom={gap.m}>
                <PhoneInput initialData={initialValues} onChange={onChange} />
            </GapView>
            <Button
                disabled={!isValid}
                isItalicText
                width={IButtonWidth.Max}
                size={IButtonSize.L}
                weight={TextWeight.Black}
                text="Войти"
                onClick={onSubmit}
            />
        </>
    );
};
