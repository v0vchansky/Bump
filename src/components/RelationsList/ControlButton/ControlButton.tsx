import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonType } from '~/features/ui-kit/components/Button/types';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { useRelationsActionSheetControls } from '~/hooks/useRelationsActionSheetControls';
import { changeRelationWithUser } from '~/store/user/actions';
import { IUserRelation, RelationList, RelationRequestType } from '~/store/user/models';
import { getIsLoadingChangeRelationWithUsers } from '~/store/user/selectors/relations';

import MenuDotsIcon from '../../../../assets/icons/menu-dots.svg';

interface IProps {
    relation: IUserRelation;
}

export const RelationListControlButton: React.FC<IProps> = ({ relation }) => {
    const dispatch = useDispatch();

    const {
        type,
        user: { uuid, displayName },
    } = relation;

    const isLoading = useSelector(getIsLoadingChangeRelationWithUsers(uuid));

    const dotsIcon = <MenuDotsIcon width={24} height={24} fill={color.slate900} />;

    const onAddClick = React.useCallback(() => {
        dispatch(changeRelationWithUser({ uuid, type: RelationRequestType.SendRequestToFriends }));
    }, []);

    const onClick = useRelationsActionSheetControls({ uuid, displayName, relationType: type });

    switch (type) {
        case RelationList.Friendship:
        case RelationList.IncomingFriendRequest:
        case RelationList.OutgoingFriendRequest:
            return (
                <Button isLoading={isLoading} weight={TextWeight.Bold} type={IButtonType.Transparent} onClick={onClick}>
                    {dotsIcon}
                </Button>
            );

        case RelationList.Nobody: {
            return (
                <Button
                    isLoading={isLoading}
                    weight={TextWeight.Bold}
                    size={IButtonSize.M}
                    text="Добавить"
                    onClick={onAddClick}
                />
            );
        }

        case RelationList.MutualFriendship: {
            return (
                <GapView right={gap.s}>
                    <Text color={color.slate600} weight={TextWeight.Black}>
                        общий
                    </Text>
                </GapView>
            );
        }

        case RelationList.You: {
            return (
                <GapView right={gap.s}>
                    <Text color={color.slate600} weight={TextWeight.Black}>
                        ты
                    </Text>
                </GapView>
            );
        }

        default:
            return null;
    }
};
