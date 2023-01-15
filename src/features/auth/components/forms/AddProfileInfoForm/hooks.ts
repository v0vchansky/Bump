import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAddProfileInfoFormStep, setProfileInfo, setProfileInfoFormValue } from '~/features/auth/store/actions';
import {
    getAddProfileInfoFormStep,
    getProfileInfoFormStepResponseStatus,
    getProfileInfoFormValue,
} from '~/features/auth/store/selectors';
import { ApiResponseStatus } from '~/models/apiResponse';
import { IUser } from '~/store/user/models';
import { getEmptyUserProfileInfoFields } from '~/store/user/selectors/common';
import { hasSomeCharInString } from '~/utils/text';

export const enum AddProfileInfoFormStep {
    DisplayName = 'displayName',
    UserName = 'userName',
    Birthday = 'birthday',
}

type ValidatorValueType = string | Date;

const onChangeValidators = {
    [AddProfileInfoFormStep.Birthday]: () => {
        return true;
    },
    [AddProfileInfoFormStep.DisplayName]: (value: ValidatorValueType) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const valueAsStr = value as string;

        return valueAsStr.indexOf(' ') < 0;
    },
    [AddProfileInfoFormStep.UserName]: (value: ValidatorValueType) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const valueAsStr = value as string;

        return /^[A-Za-z0-9._]+$/.test(valueAsStr) || valueAsStr === '';
    },
};

const onSubmitValidators = {
    [AddProfileInfoFormStep.Birthday]: (value: ValidatorValueType) => {
        if (typeof value === 'string') {
            return value.length !== 0;
        }

        return true;
    },
    [AddProfileInfoFormStep.DisplayName]: (value: ValidatorValueType) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const valueAsStr = value as string;

        return valueAsStr.length >= 1;
    },
    [AddProfileInfoFormStep.UserName]: (value: ValidatorValueType) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const valueAsStr = value as string;

        return valueAsStr.length >= 4 && /^[A-Z0-9._]+$/.test(valueAsStr) && hasSomeCharInString(valueAsStr);
    },
};

const getFirstStep = ({ displayName, userName }: Pick<IUser, 'displayName' | 'userName'>) => {
    if (!displayName) {
        return AddProfileInfoFormStep.DisplayName;
    }

    if (!userName) {
        return AddProfileInfoFormStep.UserName;
    }

    return AddProfileInfoFormStep.Birthday;
};

export const useAddProfileInfoFormApi = () => {
    const dispatch = useDispatch();

    const value = useSelector(getProfileInfoFormValue);
    const apiResponseStatus = useSelector(getProfileInfoFormStepResponseStatus);

    const [isValid, setIsValid] = React.useState(false);

    const emptyUserProfileInfoFields = useSelector(getEmptyUserProfileInfoFields);

    React.useEffect(() => {
        dispatch(setAddProfileInfoFormStep(getFirstStep(emptyUserProfileInfoFields)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const step = useSelector(getAddProfileInfoFormStep);

    const onSubmitStep = React.useCallback(() => {
        if (step) {
            dispatch(
                setProfileInfo({
                    fieldName: step,
                    fieldValue: value,
                }),
            );
            setIsValid(false);
        }
    }, [dispatch, step, value]);

    const onChange = React.useCallback(
        (value: string | Date) => {
            if (step) {
                if (onChangeValidators[step](value)) {
                    dispatch(
                        setProfileInfoFormValue(
                            step === AddProfileInfoFormStep.UserName ? String(value).toLocaleUpperCase() : value,
                        ),
                    );
                    setIsValid(onSubmitValidators[step](value));
                }
            }
        },
        [dispatch, step],
    );

    return {
        step,
        value,
        disabled: !isValid,
        isLoading: apiResponseStatus === ApiResponseStatus.Loading,
        onChange,
        onSubmitStep,
    };
};
