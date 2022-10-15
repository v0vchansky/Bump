import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '~/features/auth/store/actions';
import { getLoginRequestStatus } from '~/features/auth/store/selectors';
import { IOnChangeValues } from '~/features/ui-kit/components/PhoneInput/types';
import { ApiResponseStatus } from '~/models/apiResponse';

export const useAuthFormApi = () => {
    const dispatch = useDispatch();

    const [phone, setPhone] = React.useState<string>('');
    const [isValid, setIsValid] = React.useState<boolean>(false);

    const requestStatus = useSelector(getLoginRequestStatus);
    const isLoading = requestStatus === ApiResponseStatus.Loading;

    const onChange = React.useCallback(({ number, code, isValid }: IOnChangeValues) => {
        setPhone(`+${code}${number}`);
        setIsValid(isValid);
    }, []);

    const onSubmit = React.useCallback(() => {
        dispatch(login(phone));
    }, [dispatch, phone]);

    return {
        isValid,
        onChange,
        onSubmit,
        isLoading,
    };
};
