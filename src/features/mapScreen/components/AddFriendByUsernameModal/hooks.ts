import React from 'react';
import { useDispatch } from 'react-redux';

import { searchByUsername } from '~/store/search/actions';

export const useForm = () => {
    const dispatch = useDispatch();

    const [formValue, setFormValue] = React.useState<string>('');

    const disabled = formValue === '';

    const onChange = React.useCallback((value: string) => {
        if (/^[A-Za-z0-9._]+$/.test(value) || value === '') {
            setFormValue(value);
        }
    }, []);

    const onSubmit = React.useCallback(() => {
        dispatch(searchByUsername(formValue));
    }, [dispatch, formValue]);

    return {
        formValue,
        disabled,
        onChange,
        onSubmit,
    };
};
