import { StyleSheet } from 'react-native';

import { IGapViewProps } from './types';

export const useGapViewApi = ({ top, right, bottom, left }: Omit<IGapViewProps, 'children'>) => {
    const styles = StyleSheet.create({
        gap: {
            marginTop: top,
            marginRight: right,
            marginBottom: bottom,
            marginLeft: left,
        },
    });

    return {
        styles,
    };
};
