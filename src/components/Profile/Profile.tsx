import * as React from 'react';
import { View } from 'react-native';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { gap } from '~/features/ui-kit/constants';
import { commonVariants, pluralize } from '~/utils/pluralize';

import { RelationsList } from '../RelationsList/RelationsList';

import { Skeleton } from './Skeleton';
import { styles } from './styles';
import { IProfileProps } from './types';

export const Profile: React.FC<IProfileProps> = ({ isLoading, displayName, userName, friends }) => {
    const friendsAmount = friends.length;

    return (
        <View style={styles.root}>
            {isLoading ? (
                <Skeleton />
            ) : (
                <View style={styles.header}>
                    <View style={styles.avatar}></View>
                    <GapView left={gap.m}>
                        <View style={styles.info}>
                            <Text weight={TextWeight.Black} size={TextSize.ProfileDisplayName}>
                                {displayName}
                            </Text>
                            <GapView top={gap.xs}>
                                <View style={styles.username}>
                                    <Text size={TextSize.XS}>bump.io/{userName.toLocaleLowerCase()}</Text>
                                </View>
                            </GapView>
                        </View>
                    </GapView>
                </View>
            )}

            <GapView top={gap.m}>
                <RelationsList
                    title={`${friendsAmount} ${pluralize(friendsAmount, commonVariants.friend).toUpperCase()}`}
                    relations={friends}
                    isLoading={isLoading}
                />
            </GapView>
        </View>
    );
};
