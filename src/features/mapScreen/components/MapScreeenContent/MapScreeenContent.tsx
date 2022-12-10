import * as React from 'react';
import { View } from 'react-native';
import YaMap from 'react-native-yamap';
import { useDispatch, useSelector } from 'react-redux';

import { Screensaver } from '~/components/Screensaver/Screensaver';
import { init } from '~/store/app/actions';
import { getIsAppInited } from '~/store/app/selectors';

import { ControlsLayer } from '../ControlsLayer/ControlsLayer';

import { styles } from './styles';

export const MapScreeenContent: React.FC = () => {
    const dispatch = useDispatch();

    const isInited = useSelector(getIsAppInited);

    React.useEffect(() => {
        dispatch(init());
    }, []);

    if (!isInited) return <Screensaver />;

    return (
        <View style={styles.root}>
            <YaMap showUserPosition={false} style={styles.map} />
            <ControlsLayer />
        </View>
    );
};
