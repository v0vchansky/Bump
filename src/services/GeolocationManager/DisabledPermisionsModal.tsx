import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '~/features/ui-kit/components/Button/Button';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { gap } from '~/features/ui-kit/constants';

import { useGeolocationManager } from './GeolocationManager';

export const DisabledPermisionsModal: React.FC = () => {
    const geolocationManager = useGeolocationManager();

    return (
        <View
            style={{
                ...StyleSheet.absoluteFillObject,
                zIndex: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
            }}
        >
            <Text>Геолокация выключена</Text>
            <GapView top={gap.m}>
                <Button onClick={geolocationManager.requestPermission} text="Открыть настройки"></Button>
            </GapView>
        </View>
    );
};
