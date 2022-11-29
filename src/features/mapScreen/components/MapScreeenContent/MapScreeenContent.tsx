import * as React from 'react';
import { View } from 'react-native';
import YaMap from 'react-native-yamap';

import { ControlsLayer } from '../ControlsLayer/ControlsLayer';

import { styles } from './styles';

export const MapScreeenContent: React.FC = () => {
    return (
        <View style={styles.root}>
            <YaMap showUserPosition={false} style={styles.map} />
            <ControlsLayer />
        </View>
    );
};
