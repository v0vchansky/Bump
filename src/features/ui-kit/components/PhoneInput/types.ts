import { PhoneInputState } from 'react-native-phone-number-input';

export interface IOnChangeValues {
    number: string;
    code: string;
    isValid: boolean;
}

export type IPhoneInitialData = Required<Pick<PhoneInputState, 'code' | 'number' | 'countryCode'>>;

export interface IPhoneInputProps {
    initialData: IPhoneInitialData;
    disabled?: boolean;

    onChange: (value: IOnChangeValues) => void;
}
