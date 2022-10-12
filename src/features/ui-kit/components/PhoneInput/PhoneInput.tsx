import * as React from 'react';
import RNPhoneInput from 'react-native-phone-number-input';

import { usePhoneInputApi } from './hooks';
import { styles } from './styles';
import { IPhoneInputProps } from './types';

export const PhoneInput: React.FC<IPhoneInputProps> = ({ initialData, disabled, onChange }) => {
    const { phoneInputRef, phoneValues, onChangeCountryCode, onChangeNumber } = usePhoneInputApi({
        initialData,
        onChange,
    });

    return (
        <RNPhoneInput
            ref={phoneInputRef}
            defaultValue={phoneValues.number}
            defaultCode={phoneValues.countryCode}
            layout="first"
            placeholder="Номер телефона"
            onChangeText={onChangeNumber}
            disabled={disabled}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChangeCountry={(country: any) => {
                onChangeCountryCode(country.callingCode[0], country.cca2);
            }}
            textInputStyle={styles.textInputStyle}
            codeTextStyle={styles.codeTextStyle}
            containerStyle={styles.containerStyle}
            textContainerStyle={styles.textContainerStyle}
            autoFocus
        />
    );
};
