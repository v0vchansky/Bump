import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';

import { IRootState } from '../../store';
import { operation } from '../../store/test/actions';

import { styles } from './TestComponents.styles';

export function TestComponent() {
    const dispatch = useDispatch();
    const num = useSelector((state: IRootState) => state.test.num);
    const netInfo = useNetInfo();

    const onClick = React.useCallback(
        (sign: '+' | '-') => {
            return () => {
                dispatch(operation({ sign }));
            };
        },
        [dispatch],
    );

    React.useEffect(() => {
        if (netInfo.isConnected === false) {
            Alert.alert('Соединение прервалось');
        }
    }, [netInfo.isConnected]);

    return (
        <View style={styles.wrapper}>
            <Text>Ios component</Text>
            <TouchableOpacity style={styles.button} onPress={onClick('-')}>
                <Text style={styles.button.text}>-</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{num}</Text>
            <TouchableOpacity style={styles.button} onPress={onClick('+')}>
                <Text style={styles.button.text}>+</Text>
            </TouchableOpacity>
            <Text>{String(netInfo.isConnected)} - Test</Text>
        </View>
    );
}
