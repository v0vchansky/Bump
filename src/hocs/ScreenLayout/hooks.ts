import { Platform, StatusBar, StyleSheet } from 'react-native';

import { gap } from '~/features/ui-kit/constants';

import { IScreenLayoutProps } from './types';

export const useScreenLayoutApi = ({ bgColor }: IScreenLayoutProps) => {
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

    const styles = StyleSheet.create({
        layout: {
            flex: 1,
            backgroundColor: bgColor,
            paddingTop: STATUSBAR_HEIGHT,
            height: '100%',
            paddingLeft: gap.xxl,
            paddingRight: gap.xxl,
        },
    });

    return {
        styles,
    };
};
