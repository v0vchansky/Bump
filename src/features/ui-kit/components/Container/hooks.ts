import { StyleSheet } from 'react-native';

import { IContainerProps } from './types';

export const useContainerApi = ({ top, right, bottom, left }: Omit<IContainerProps, 'children'>) => {
    const styles = StyleSheet.create({
        gap: {
            paddingTop: top,
            paddingRight: right,
            paddingBottom: bottom,
            paddingLeft: left,
        },
    });

    return {
        styles,
    };
};
