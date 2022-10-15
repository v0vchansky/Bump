import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isAfter from 'date-fns/isAfter';

import { logout } from '~/features/auth/store/actions';
import { getAuthTokens } from '~/features/auth/store/selectors';
import { PageName } from '~/router/pageName';
import { redirectToPageWithoutHistory } from '~/store/router/actions';
import { getNavigation } from '~/store/router/selectors';

export const useAuthOverlay = () => {
    const dispatch = useDispatch();
    const tokens = useSelector(getAuthTokens);
    const refreshToken = tokens?.refreshToken;
    const navigation = useSelector(getNavigation);
    const isLoading = navigation === null || !navigation.isReady();

    React.useEffect(() => {
        const now = new Date();

        if (isLoading) return;

        if (!refreshToken?.token || isAfter(now, new Date(refreshToken.endTime))) {
            dispatch(logout());
            dispatch(redirectToPageWithoutHistory(PageName.HelloPage));
        } else {
            dispatch(redirectToPageWithoutHistory(PageName.Map));
        }
    }, [dispatch, isLoading, navigation, refreshToken]);

    return { isLoading };
};
