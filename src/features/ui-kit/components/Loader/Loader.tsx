import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { color } from '../../constants';

interface IProps {
    dark?: boolean;
}

export const Loader: React.FC<IProps> = ({ dark }) => {
    return (
        <View>
            <ActivityIndicator color={dark ? color.slate900 : color.slate50} />
        </View>
    );
};
