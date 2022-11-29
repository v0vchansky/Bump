import * as React from 'react';
import { View } from 'react-native';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { commonVariants, pluralize } from '~/utils/pluralize';

import { styles } from './styles';

interface IProps {
    name: string;
    friendsAmount: number;
    button: JSX.Element;
}

export const UserListRow: React.FC<IProps> = ({ name, friendsAmount, button }) => {
    const amount = friendsAmount > 50 ? 50 : friendsAmount;

    return (
        <View style={styles.listRow}>
            <View style={styles.rowInfo}>
                <View style={styles.rowAvatar}>
                    {/* TODO доделать "либо аватарка либо буква и (цвет?)" */}
                    <Text color={color.slate50} weight={TextWeight.Black} size={TextSize.M}>
                        {name[0]}
                    </Text>
                </View>
                <GapView left={gap.xs}>
                    <View style={styles.desc}>
                        <Text weight={TextWeight.Bold} size={TextSize.M} numberOfLines={1} ellipsizeMode="tail">
                            {name}
                        </Text>
                        <GapView top={gap.xxxs}>
                            <Text color={color.slate600} weight={TextWeight.Bold} size={TextSize.M}>
                                {amount}
                                {amount === 50 ? '+' : ''} {pluralize(amount, commonVariants.friend)}
                            </Text>
                        </GapView>
                    </View>
                </GapView>
            </View>
            {button}
        </View>
    );
};
