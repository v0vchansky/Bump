import * as React from 'react';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';

import { IShowActionSheetParams, useActionSheet } from '~/overlays/ActionSheet/ActionSheet';
import { changeRelationWithUser } from '~/store/user/actions';
import { RelationList, RelationRequestType } from '~/store/user/models';

interface IParams {
    uuid: string;
    displayName: string;
    relationType: RelationList | undefined;
}

export const useRelationsActionSheetControls = ({ uuid, displayName, relationType }: IParams) => {
    const dispatch = useDispatch();
    const { showActionSheet } = useActionSheet();

    const createOnClick = React.useCallback((actionsSheetParams: IShowActionSheetParams | undefined) => {
        return () => {
            if (!actionsSheetParams) {
                return;
            }

            Keyboard.dismiss();
            showActionSheet(actionsSheetParams);
        };
    }, []);

    const actionsSheetParams: IShowActionSheetParams | undefined = React.useMemo(() => {
        switch (relationType) {
            case RelationList.Friendship:
                return {
                    title: `${displayName} твой друг`,
                    variants: [
                        {
                            title: 'Удалить из друзей',
                            onClick: () =>
                                dispatch(changeRelationWithUser({ uuid, type: RelationRequestType.RemoveFromFriends })),
                        },
                        {
                            title: 'Заблокировать',
                            onClick: () =>
                                dispatch(changeRelationWithUser({ uuid, type: RelationRequestType.RemoveFromFriends })),
                        },
                    ],
                };
            case RelationList.IncomingFriendRequest:
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
                                    }),
                                ),
                        },
                        {
                            title: 'Отклонить заявку',
                            onClick: () =>
                                dispatch(
                                    changeRelationWithUser({ uuid, type: RelationRequestType.RejectFriendRequest }),
                                ),
                        },
                        {
                            title: 'Заблокировать',
                            onClick: () =>
                                dispatch(
                                    changeRelationWithUser({ uuid, type: RelationRequestType.RejectFriendRequest }),
                                ),
                        },
                    ],
                };
            case RelationList.OutgoingFriendRequest:
                return {
                    title: 'Отменить заявку в друзья?',
                    variants: [
                        {
                            title: 'Отменить заявку',
                            onClick: () =>
                                dispatch(
                                    changeRelationWithUser({ uuid, type: RelationRequestType.CancelFriendRequest }),
                                ),
                        },
                        {
                            title: 'Заблокировать',
                            onClick: () =>
                                dispatch(
                                    changeRelationWithUser({ uuid, type: RelationRequestType.CancelFriendRequest }),
                                ),
                        },
                    ],
                };
        }
    }, [dispatch, displayName, relationType, uuid]);

    return createOnClick(actionsSheetParams);
};
