import * as React from 'react';

import { ActivityManagerContext } from '~/services/ActivityManager/ActivityManager';

export const useActivity = () => {
    const contextValue = React.useContext(ActivityManagerContext);

    if (contextValue === null) {
        throw new Error('ActivityManagerContext is not provided');
    }

    return contextValue;
};
