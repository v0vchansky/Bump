import * as React from 'react';

import { TWTextInput } from '../../nativewind/nativeComponents';

interface ITextInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isSecure?: boolean;
}

export const TextInput: React.FC<ITextInputProps> = ({ value, placeholder, isSecure, onChange }) => {
    return (
        <TWTextInput
            placeholder={placeholder}
            onChangeText={onChange}
            value={value}
            secureTextEntry={isSecure}
            autoCapitalize="none"
            className="bg-slate-50 rounded-xl mt-3 pt-3 pb-3 pl-3 w-full border-solid border-slate-300 border-2"
        />
    );
};
