import * as React from 'react';

import { IOnChangeValues } from '~/features/ui-kit/components/PhoneInput/types';

export const useAuthFormApi = () => {
    const [phone, setPhone] = React.useState<string>('');
    const [isValid, setIsValid] = React.useState<boolean>(false);

    const onChange = React.useCallback(({ number, code, isValid }: IOnChangeValues) => {
        setPhone(`+${code}${number}`);
        setIsValid(isValid);
    }, []);

    const onSubmit = React.useCallback(() => {
        console.log(phone);
    }, [phone]);

    return {
        isValid,
        onChange,
        onSubmit,
    };
};
