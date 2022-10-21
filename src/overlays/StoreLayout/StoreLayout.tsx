import React from 'react';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import { IRootStackParamList } from '~/router/types';

import { createAppStore, createPersistor } from '../../store/create-app-store';
import { routerUpdateNavigation } from '../../store/router/actions';

interface INetworkLayoutProps {
    children: JSX.Element;
}

interface INetworkLayoutInnerProps {
    children: JSX.Element;
}

const StoreLayoutInner = ({ children }: INetworkLayoutInnerProps) => {
    const dispatch = useDispatch();
    const navigationRef = useNavigationContainerRef<IRootStackParamList>();

    const onChangeNavigation = React.useCallback(() => {
        dispatch(routerUpdateNavigation(navigationRef));
    }, [dispatch, navigationRef]);

    return (
        <NavigationContainer ref={navigationRef} onReady={onChangeNavigation}>
            {children}
        </NavigationContainer>
    );
};

export const StoreLayout = ({ children }: INetworkLayoutProps) => {
    const store = React.useRef(createAppStore());
    const persistor = React.useRef(createPersistor(store.current));

    return (
        <ReduxProvider store={store.current}>
            <PersistGate loading={null} persistor={persistor.current}>
                <StoreLayoutInner>{children}</StoreLayoutInner>
            </PersistGate>
        </ReduxProvider>
    );
};
