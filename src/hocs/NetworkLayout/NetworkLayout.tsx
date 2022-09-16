import * as React from 'react';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

interface INetworkLayoutProps {
    children: JSX.Element;
}

export const NetworkLayout = ({ children }: INetworkLayoutProps) => {
    const netInfo = useNetInfo();

    React.useEffect(() => {
        if (netInfo.isConnected === false) {
            Alert.alert('Соединение прервалось');
        }
    }, [netInfo.isConnected]);

    return children;
};
