import React from 'react';
import { Dimensions } from 'react-native';
import { BaseToast } from 'react-native-toast-message';
import { ToastConfig } from 'react-native-toast-message/lib/src/types';

import { color, font, fontSize, gap } from '~/features/ui-kit/constants';

import { ToastType } from './store/types';

export const config: ToastConfig = {
    [ToastType.Success]: props => (
        <BaseToast
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            text1Style={{
                ...fontSize.l,
                color: color.slate900,
                fontFamily: font['TTDaysSansBlack'],
            }}
            text2Style={{
                ...fontSize.m,
                fontFamily: font['TTDaysSansBold'],
                color: color.slate800,
                marginTop: gap.xxs,
            }}
            style={{
                width: Dimensions.get('window').width - gap.s,
                height: 65,
                borderLeftColor: color.green600,
            }}
            contentContainerStyle={{
                paddingHorizontal: gap.m,
            }}
        />
    ),
    [ToastType.Error]: props => (
        <BaseToast
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            text1Style={{
                ...fontSize.l,
                color: color.slate900,
                fontFamily: font['TTDaysSansBlack'],
            }}
            text2Style={{
                ...fontSize.m,
                lineHeight: 20,
                fontFamily: font['TTDaysSansBold'],
                color: color.slate800,
                marginTop: gap.xxs,
            }}
            style={{
                width: Dimensions.get('window').width - gap.s,
                height: 65,
                borderLeftColor: color.red600,
            }}
            contentContainerStyle={{
                paddingHorizontal: gap.m,
            }}
        />
    ),
};
