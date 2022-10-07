import * as React from 'react';

import { TWTextInput } from '../../nativewind/nativeComponents';

import { useTextInputApi } from './hooks';
import { ITextInputProps } from './types';

export const TextInput: React.FC<ITextInputProps> = props => {
    const { className } = useTextInputApi(props);
    const { placeholder, value, isSecure, onChange } = props;

    // return (
    //     <TWTextInput
    //         placeholder={placeholder}
    //         onChangeText={onChange}
    //         value={value}
    //         secureTextEntry={isSecure}
    //         autoCapitalize="none"
    //         // className="bg-slate-50 rounded-xl mt-3 pt-3 pb-3 pl-3 w-full border-solid border-slate-300 border-2"
    //         className={className}
    //     />
    // );

    return null;
};
