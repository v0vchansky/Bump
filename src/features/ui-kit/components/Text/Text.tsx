import * as React from 'react';

import { TWText } from '../../nativewind/nativeComponents';

// import { useTextApi } from './hooks';
import { ITextProps } from './types';

export const Text: React.FC<ITextProps> = ({ children, className, weight, size, isItalic, color }) => {
    // const { textClassNames } = useTextApi({ size, weight, isItalic, color });

    // return <TWText className={`${textClassNames} ${className || ''}`}>{children}</TWText>;
    return <TWText>{children}</TWText>;
};
