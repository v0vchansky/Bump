import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';

import { styles } from './styles';

interface IProps {
    onClick?: VoidFunction;
    Icon: React.FC<SvgProps>;
    text: string | JSX.Element;
    disabled?: boolean;
}

export const SourceButton: React.FC<IProps> = ({ text, Icon, disabled, onClick }) => {
    return (
        <TouchableOpacity activeOpacity={0.85} onPress={onClick}>
            <View style={styles.root}>
                <View style={{ ...styles.icon, ...(disabled ? { backgroundColor: color.slate700 } : {}) }}>
                    <Icon width={20} height={20} fill={color.white} />
                </View>
                <GapView left={gap.xs}>
                    <Text weight={TextWeight.Bold} color={disabled ? color.slate700 : color.primary} size={TextSize.M}>
                        {text}
                    </Text>
                </GapView>
            </View>
        </TouchableOpacity>
    );
};
