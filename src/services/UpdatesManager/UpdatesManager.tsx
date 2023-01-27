import * as React from 'react';
import VersionCheck from 'react-native-version-check';

import { useAppStateManager } from '~/hooks/useAppStateManager';

import { UpdatesManagerModal } from './UpdatesManagerModal';

export const UpdatesManager: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const [needUpdate, setNeedUpdate] = React.useState(false);

    const checkUpdate = React.useCallback(() => {
        VersionCheck.needUpdate({ ignoreErrors: true })
            .then(async res => {
                if (res?.isNeeded) {
                    setNeedUpdate(true);

                    return;
                }

                setNeedUpdate(false);
            })
            .catch();
    }, []);

    React.useEffect(() => {
        checkUpdate();
    }, []);

    useAppStateManager({ onForeground: checkUpdate });

    return (
        <React.Fragment>
            {needUpdate && <UpdatesManagerModal />}
            {children}
        </React.Fragment>
    );
};
