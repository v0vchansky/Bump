import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PersistGate } from 'redux-persist/integration/react';

import { IRootStackParamList, NavigationType } from '../../router/types';
import { createAppStore, createPersistor } from '../../store/create-app-store';
import { routerUpdateNavigation } from '../../store/router/actions';

interface INetworkLayoutProps {
    children: JSX.Element;
}

interface INetworkLayoutInnerProps {
    children: JSX.Element;
    navigation: NavigationType;
}

const StoreLayoutInner = ({ children, navigation }: INetworkLayoutInnerProps) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(routerUpdateNavigation(navigation));
    }, [dispatch, navigation]);

    return children;
};

export const StoreLayout = ({ children }: INetworkLayoutProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const navigation: NavigationType = useNavigation<NativeStackNavigationProp<IRootStackParamList>>();

    const store = React.useRef(createAppStore(navigation));
    const persistor = React.useRef(createPersistor(store.current));

    return (
        <Provider store={store.current}>
            <PersistGate loading={null} persistor={persistor.current}>
                <StoreLayoutInner navigation={navigation}>{children}</StoreLayoutInner>
            </PersistGate>
        </Provider>
    );
};
