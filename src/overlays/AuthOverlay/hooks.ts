import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsAuthorized } from '~/features/auth/store/selectors';
import { PageName } from '~/router/pageName';
import { redirectToPageWithoutHistory } from '~/store/router/actions';
import { getNavigation } from '~/store/router/selectors';
import { getShouldAddProfileInfo } from '~/store/user/selectors';

export const useAuthOverlay = () => {
    const dispatch = useDispatch();
    const isAuthorized = useSelector(getIsAuthorized);
    const shouldAddProfileInfo = useSelector(getShouldAddProfileInfo);
    const navigation = useSelector(getNavigation);

    const isLoading = navigation === null || !navigation.isReady();

    React.useEffect(() => {
        if (isLoading) return;

        if (shouldAddProfileInfo) {
            dispatch(redirectToPageWithoutHistory(PageName.AddProfileInfo));

            return;
        }

        if (isAuthorized) {
            dispatch(redirectToPageWithoutHistory(PageName.Map));
        }
    }, [isLoading]);

    return { isLoading };
};
