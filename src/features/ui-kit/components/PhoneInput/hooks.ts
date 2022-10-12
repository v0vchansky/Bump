import React from 'react';
import RNPhoneInput, { isValidNumber } from 'react-native-phone-number-input';

import { IPhoneInitialData, IPhoneInputProps } from './types';

export const usePhoneInputApi = ({ initialData, onChange }: IPhoneInputProps) => {
    const phoneInputRef = React.useRef<RNPhoneInput>(null);
    const [phoneValues, setPhoneValues] = React.useState<IPhoneInitialData>(initialData);

    const isValid = React.useMemo(
        () => isValidNumber(phoneValues.number, phoneValues.countryCode),
        [phoneValues.countryCode, phoneValues.number],
    );

    const onChangeCountryCode = React.useCallback(
        (code: string, countryCode: IPhoneInitialData['countryCode']) => {
            setPhoneValues({
                ...phoneValues,
                code,
                countryCode,
            });
            onChange({ code, number: phoneValues.number, isValid: isValidNumber(phoneValues.number, countryCode) });
        },
        [onChange, phoneValues],
    );

    const onChangeNumber = React.useCallback(
        (number: string) => {
            setPhoneValues({
                ...phoneValues,
                number,
            });
            onChange({
                // Фиксим из-за типа string | undefined в библиотеке
                // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                code: phoneValues.code as string,
                number,
                isValid: isValidNumber(number, phoneValues.countryCode),
            });
        },
        [onChange, phoneValues],
    );

    return {
        phoneInputRef,
        phoneValues,
        isValid,
        onChangeNumber,
        onChangeCountryCode,
    };
};
