import * as React from 'react';
import { View } from 'react-native';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { IUserRelation, RelationList } from '~/store/user/models';
import { commonVariants, pluralize } from '~/utils/pluralize';

import { RelationListControlButton } from './ControlButton/ControlButton';
import { Skeleton } from './Skeleton/Skeleton';
import { styles } from './styles';

interface IProps {
    title?: string;
    relations: IUserRelation[];

    isLoading: boolean;

    fromSearch?: boolean;

    skeletonMinElements?: number;
    skeletonMaxElements?: number;
}

export const RelationsList: React.FC<IProps> = ({
    title,
    relations,
    fromSearch,
    isLoading,
    skeletonMinElements,
    skeletonMaxElements,
}) => {
    if (isLoading) {
        return (
            <Skeleton
                title={title}
                skeletonMinElements={skeletonMinElements}
                skeletonMaxElements={skeletonMaxElements}
            />
        );
    }

    return (
        <View>
            {Boolean(title) && <Text weight={TextWeight.Black}>{title}</Text>}
            {relations.map((relation, key) => {
                const firstItemGap = key === 0 && !title ? undefined : gap.xs;

                const {
                    user: { uuid, displayName, userRelations },
                } = relation;

                const friendsAmount = userRelations.filter(
                    relation => relation.type === RelationList.Friendship,
                ).length;

                const amount = friendsAmount > 50 ? 50 : friendsAmount;

                return (
                    <GapView top={firstItemGap} key={uuid}>
                        <View style={styles.listRow}>
                            <View style={styles.rowInfo}>
                                <View style={styles.rowAvatar}>
                                    {/* TODO доделать "либо аватарка либо буква и (цвет?)" */}
                                    <Text color={color.slate50} weight={TextWeight.Black} size={TextSize.M}>
                                        {displayName[0]}
                                    </Text>
                                </View>
                                <GapView left={gap.xs}>
                                    <View style={styles.desc}>
                                        <Text
                                            weight={TextWeight.Bold}
                                            size={TextSize.M}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {displayName}
                                        </Text>
                                        <GapView top={gap.xxxs}>
                                            <Text color={color.slate600} weight={TextWeight.Bold} size={TextSize.M}>
                                                {amount}
                                                {amount === 50 ? '+' : ''} {pluralize(amount, commonVariants.friend)} в
                                                bump
                                            </Text>
                                        </GapView>
                                    </View>
                                </GapView>
                            </View>
                            <RelationListControlButton fromSearch={fromSearch} relation={relation} />
                        </View>
                    </GapView>
                );
            })}
        </View>
    );
};
