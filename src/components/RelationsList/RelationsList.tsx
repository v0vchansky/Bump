import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { nextProfile, openProfile } from '~/store/search/actions';
import { getShouldOpenProfileModal } from '~/store/search/selectors';
import { IFullUser, IUserRelation } from '~/store/user/models';

import { Avatar } from '../Avatar/Avatar';

import { RelationListControlButton } from './ControlButton/ControlButton';
import { Skeleton } from './Skeleton/Skeleton';
import { styles } from './styles';

interface IProps {
    title?: string;
    relations: IUserRelation[];

    isLoading: boolean;

    skeletonMinElements?: number;
    skeletonMaxElements?: number;
}

export const RelationsList: React.FC<IProps> = ({
    title,
    relations,
    isLoading,
    skeletonMinElements,
    skeletonMaxElements,
}) => {
    const dispatch = useDispatch();

    const shouldOpenProfileModal = useSelector(getShouldOpenProfileModal);

    const createOnNextProfile = React.useCallback(
        (user: IFullUser) => {
            return () => {
                dispatch(shouldOpenProfileModal ? openProfile(user) : nextProfile(user));
            };
        },
        [dispatch, shouldOpenProfileModal],
    );

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
                    user: { uuid, displayName, userName, avatarUrl },
                } = relation;

                return (
                    <GapView top={firstItemGap} key={uuid}>
                        <TouchableOpacity onPress={createOnNextProfile(relation.user)} activeOpacity={0.85}>
                            <View style={styles.listRow}>
                                <View style={styles.rowInfo}>
                                    <Avatar size="relations-list" avatarUrl={avatarUrl} displayName={displayName} />
                                    <GapView left={gap.xs}>
                                        <View style={styles.desc}>
                                            <Text
                                                weight={TextWeight.Bold}
                                                size={TextSize.L}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {displayName}
                                            </Text>
                                            <GapView top={gap.xxs}>
                                                <Text color={color.slate600} weight={TextWeight.Bold} size={TextSize.M}>
                                                    {`@${userName.toLocaleLowerCase()}`}
                                                </Text>
                                            </GapView>
                                        </View>
                                    </GapView>
                                </View>
                                <RelationListControlButton relation={relation} />
                            </View>
                        </TouchableOpacity>
                    </GapView>
                );
            })}
        </View>
    );
};
