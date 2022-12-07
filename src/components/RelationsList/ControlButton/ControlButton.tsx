import * as React from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonType } from '~/features/ui-kit/components/Button/types';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { IShowActionSheetParams, useActionSheet } from '~/overlays/ActionSheet/ActionSheet';
import { changeRelationWithUser } from '~/store/user/actions';
import { IUserRelation, RelationList, RelationRequestType } from '~/store/user/models';
import { getIsLoadingChangeRelationWithUsers } from '~/store/user/selectors/relations';

import MenuDotsIcon from '../../../../assets/icons/menu-dots.svg';

interface IProps {
    fromSearch?: boolean;
    relation: IUserRelation;
}

export const RelationListControlButton: React.FC<IProps> = ({ relation, fromSearch }) => {
    const dispatch = useDispatch();

    const {
        type,
        user: { uuid, displayName },
    } = relation;
    const { showActionSheet } = useActionSheet();

    const isLoading = useSelector(getIsLoadingChangeRelationWithUsers(uuid));

    const onAddClick = React.useCallback(() => {
        dispatch(changeRelationWithUser({ uuid, type: RelationRequestType.SendRequestToFriends, fromSearch }));
    }, []);

    const createOnClick = React.useCallback((actionsSheetParams: IShowActionSheetParams) => {
        return () => {
            Keyboard.dismiss();
            showActionSheet(actionsSheetParams);
        };
    }, []);

    const removeFriend = React.useMemo(() => {
        return {
            title: `${displayName} твой друг`,
            variants: [
                {
                    title: 'Удалить из друзей',
                    onClick: () =>
                        dispatch(
                            changeRelationWithUser({ uuid, type: RelationRequestType.RemoveFromFriends, fromSearch }),
                        ),
                },
            ],
        };
    }, []);

    const discardRequest = React.useMemo(() => {
        return {
            title: `Принять ${displayName} в друзья?`,
            variants: [
                {
                    title: 'Принять в друзья',
                    onClick: () =>
                        dispatch(
                            changeRelationWithUser({
                                uuid,
                                type: RelationRequestType.ResolveFriendRequest,
                                fromSearch,
                            }),
                        ),
                },
                {
                    title: 'Отклонить заявку',
                    onClick: () =>
                        dispatch(
                            changeRelationWithUser({ uuid, type: RelationRequestType.RejectFriendRequest, fromSearch }),
                        ),
                },
            ],
        };
    }, []);

    const cancelRequest = React.useMemo(() => {
        return {
            title: 'Отменить заявку в друзья?',
            variants: [
                {
                    title: 'Отменить заявку',
                    onClick: () =>
                        dispatch(
                            changeRelationWithUser({ uuid, type: RelationRequestType.CancelFriendRequest, fromSearch }),
                        ),
                },
            ],
        };
    }, []);

    switch (type) {
        case RelationList.Friendship: {
            return (
                <Button
                    isLoading={isLoading}
                    weight={TextWeight.Bold}
                    type={IButtonType.Transparent}
                    onClick={createOnClick(removeFriend)}
                >
                    <MenuDotsIcon width={24} height={24} fill={color.slate900} />
                </Button>
            );
        }

        case RelationList.IncomingFriendRequest: {
            return (
                <Button
                    isLoading={isLoading}
                    weight={TextWeight.Bold}
                    type={IButtonType.Transparent}
                    onClick={createOnClick(discardRequest)}
                >
                    <MenuDotsIcon width={24} height={24} fill={color.slate900} />
                </Button>
            );
        }

        case RelationList.OutgoingFriendRequest: {
            return (
                <Button
                    isLoading={isLoading}
                    weight={TextWeight.Bold}
                    type={IButtonType.Transparent}
                    onClick={createOnClick(cancelRequest)}
                >
                    <MenuDotsIcon width={24} height={24} fill={color.slate900} />
                </Button>
            );
        }

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
