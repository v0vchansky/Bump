import * as React from 'react';
import { View } from 'react-native';

import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonWidth } from '~/features/ui-kit/components/Button/types';
import { DateInput } from '~/features/ui-kit/components/DateInput/DateInput';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { TextWeight } from '~/features/ui-kit/components/Text/types';
import { TextInput } from '~/features/ui-kit/components/TextInput/TextInput';
import { gap } from '~/features/ui-kit/constants';

import { AuthTitle } from '../../AuthTitle/AuthTitle';

import { AddProfileInfoFormStep, useAddProfileInfoFormApi } from './hooks';

export const AddProfileInfoForm: React.FC = () => {
    const { step, value, disabled, isLoading, onChange, onSubmitStep } = useAddProfileInfoFormApi();

    const displayName = React.useMemo(() => {
        if (step !== AddProfileInfoFormStep.DisplayName) return null;

        return (
            <>
                <AuthTitle>Как тебя зовут?</AuthTitle>
                <TextInput
                    size="l"
                    autoFocus
                    onChange={onChange}
                    withBottomBorder
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                    value={value as string}
                    placeholder="Вова"
                    maxLength={20}
                />
            </>
        );
    }, [onChange, step, value]);

    const userName = React.useMemo(() => {
        if (step !== AddProfileInfoFormStep.UserName) return null;

        return (
            <>
                <AuthTitle>Твой никнейм</AuthTitle>
                <TextInput
                    size="l"
                    autoFocus
                    onChange={onChange}
                    autoCapitalize="characters"
                    withBottomBorder
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                    value={value as string}
                    placeholder="V0VCHANSKY"
                    maxLength={20}
                />
            </>
        );
    }, [onChange, step, value]);

    const birthday = React.useMemo(() => {
        if (step !== AddProfileInfoFormStep.Birthday) return null;

        return (
            <>
                <AuthTitle>Когда ты родился?</AuthTitle>
                <DateInput onChange={onChange} title="Когда ты родился?" />
            </>
        );
    }, [onChange, step]);

    const currentStep = React.useMemo(() => {
        if (step === AddProfileInfoFormStep.DisplayName) {
            return displayName;
        }

        if (step === AddProfileInfoFormStep.UserName) {
            return userName;
        }

        if (step === AddProfileInfoFormStep.Birthday) {
            return birthday;
        }
    }, [birthday, displayName, step, userName]);

    return (
        <View>
            {currentStep}
            <GapView top={gap.m}>
                <Button
                    disabled={disabled}
                    isLoading={isLoading}
                    width={IButtonWidth.Max}
                    size={IButtonSize.L}
                    weight={TextWeight.Regular}
                    onClick={onSubmitStep}
                    text="Продолжить"
                />
            </GapView>
        </View>
    );
};
