import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApiResponseStatus } from '~/models/apiResponse';
import { useModalWindow } from '~/overlays/ModalWindow/hooks';

import { submitLogin } from '../../store/actions';
import { getSubmitLoginRequestStatus } from '../../store/selectors';

import { AUTH_CODE_MODAL_NAME } from './constants';

export const codeLenght = 4;

export const useAuthCodeModalApi = () => {
    const dispatch = useDispatch();

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

    const submitLoginRequestStatus = useSelector(getSubmitLoginRequestStatus);
    const isLoading = submitLoginRequestStatus === ApiResponseStatus.Loading;
    const isError = submitLoginRequestStatus === ApiResponseStatus.Error;

    const submitButtonDisabled = value.length < codeLenght || isLoading || isError;

    const modal = useModalWindow(AUTH_CODE_MODAL_NAME);

    const onPress = () => {
        modal?.snapToIndex(1);
    };

    return {
        isLoading,
        submitButtonDisabled,
        onSubmit,
        onChange,
        onPress,
    };
};
