import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize } from '~/features/ui-kit/components/Button/types';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextWeight } from '~/features/ui-kit/components/Text/types';
import { color } from '~/features/ui-kit/constants';
import { changeRelationWithUser } from '~/store/user/actions';
import { RelationList, RelationRequestType } from '~/store/user/models';
import { getIsLoadingChangeRelationWithUsers } from '~/store/user/selectors/relations';

interface IProps {
    uuid: string;
    relationType: RelationList | undefined;
}

export const ProfileControlButton: React.FC<IProps> = ({ relationType, uuid }) => {
    const dispatch = useDispatch();

    const isLoading = useSelector(getIsLoadingChangeRelationWithUsers(uuid));

    const onClick = React.useCallback(() => {
        dispatch(changeRelationWithUser({ uuid, type: RelationRequestType.SendRequestToFriends }));
    }, [dispatch, uuid]);

    const text = React.useMemo(() => {
        switch (relationType) {
            case RelationList.Friendship:
                return 'В друзьях';
            case RelationList.IncomingFriendRequest:
                return 'Входящая заявка';
            case RelationList.OutgoingFriendRequest:
                return 'Приглашен';
            default:
                return undefined;
        }
    }, [relationType]);

    if (relationType === RelationList.Nobody) {
        return (
            <Button
                isLoading={isLoading}
                size={IButtonSize.S}
                weight={TextWeight.Bold}
                text="Добавить"
                onClick={onClick}
            />
        );
    }

    if (!text) {
        return null;
    }

    return (
        <Text weight={TextWeight.Black} color={color.slate600}>
            {text}
        </Text>
    );
};
