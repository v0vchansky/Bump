import * as React from 'react';
import { View } from 'react-native';

import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonType } from '~/features/ui-kit/components/Button/types';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { commonVariants, pluralize } from '~/utils/pluralize';

import MenuDotsIcon from '../../../assets/icons/menu-dots.svg';
import { UserListRow } from '../UserListRow/UserListRow';

import { styles } from './styles';
import { IProfileProps } from './types';

export const Profile: React.FC<IProfileProps> = ({ displayName, userName, friends }) => {
    const friendsAmount = friends.length;

    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <View style={styles.avatar}></View>
                <GapView left={gap.m}>
                    <View style={styles.info}>
                        <Text weight={TextWeight.Black} size={TextSize.ProfileDisplayName}>
                            {displayName}
                        </Text>
                        <GapView top={gap.xs}>
                            <View style={styles.username}>
                                <Text size={TextSize.XS}>bump.io/{userName}</Text>
                            </View>
                        </GapView>
                    </View>
                </GapView>
            </View>
            <View style={styles.list}>
                <GapView top={gap.m}>
                    <Text weight={TextWeight.Black}>
                        {friendsAmount} {pluralize(friendsAmount, commonVariants.friend).toUpperCase()}
                    </Text>
                    {friends.map(friend => {
                        return (
                            <GapView top={gap.xs} key={friend.uuid}>
                                <UserListRow
                                    name={friend.displayName}
                                    friendsAmount={friend.friendsAmount}
                                    button={
                                        <Button type={IButtonType.Transparent} weight={TextWeight.Bold}>
                                            <MenuDotsIcon width={24} height={24} fill={color.slate900} />
                                        </Button>
                                    }
                                />
                            </GapView>
                        );
                    })}
                </GapView>
            </View>
        </View>
    );
};
