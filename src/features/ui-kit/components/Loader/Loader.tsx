import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { color } from '../../constants';

export const Loader: React.FC = () => {
    return (
        <View>
            <ActivityIndicator color={color.slate50} />
        </View>
    );
};
