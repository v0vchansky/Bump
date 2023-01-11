import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';

import { runAction } from '~/store/shadowActions/actions';
import { getMe } from '~/store/user/selectors/me';

// eslint-disable-next-line react/display-name
export const ShadowActionsManager: React.FC = React.memo(() => {
    const dispatch = useDispatch();

    const userUuid = useSelector(getMe)?.uuid;

    React.useEffect(() => {
        if (userUuid) {
            const path = `shadowActions/${userUuid}`;

            const onValueChange = database()
                .ref(path)
                .on('child_added', snapshot => {
                    const actionUuid = snapshot.val();

                    if (actionUuid) {
                        dispatch(runAction(actionUuid));
                    }
                });

            return () => database().ref(path).off('value', onValueChange);
        }
    }, [userUuid]);

    return null;
});
