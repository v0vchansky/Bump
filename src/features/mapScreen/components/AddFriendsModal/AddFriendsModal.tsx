import * as React from 'react';
import { useDispatch } from 'react-redux';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { SourceButton } from '~/components/SourceButton/SourceButton';
import { UserListRow } from '~/components/UserListRow/UserListRow';
import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize } from '~/features/ui-kit/components/Button/types';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { openByName } from '~/overlays/ModalWindow/store/actions';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';

import AddressBookIcon from '../../../../../assets/icons/address-book.svg';
import PencilIcon from '../../../../../assets/icons/pencil.svg';
import { ADD_FRIEND_BY_USERNAME_MODAL_NAME } from '../AddFriendByUsernameModal/AddFriendByUsernameModal';

export const ADD_FRIENDS_MODAL_NAME = 'add-friends-modal';

const requests = [
    {
        uuid: '1',
        displayName: 'Вика',
        friendsAmount: 34,
    },
    {
        uuid: '2',
        displayName: 'Алина',
        friendsAmount: 25,
    },
    {
        uuid: '3',
        displayName: 'Аня',
        friendsAmount: 65,
    },
];

const recommendations = [
    {
        uuid: '1',
        displayName: 'Вика',
        friendsAmount: 34,
    },
    {
        uuid: '2',
        displayName: 'Алина',
        friendsAmount: 25,
    },
    {
        uuid: '3',
        displayName: 'Аня',
        friendsAmount: 65,
    },
    {
        uuid: '4',
        displayName: 'Вова',
        friendsAmount: 12,
    },
    {
        uuid: '5',
        displayName: 'Витя',
        friendsAmount: 1,
    },
];

export const AddFriendsModalContent: React.FC = () => {
    const dispatch = useDispatch();

    const onAddByNickname = React.useCallback(() => {
        dispatch(openByName(ADD_FRIEND_BY_USERNAME_MODAL_NAME));
    }, []);

    const acceptButton = <Button weight={TextWeight.Bold} size={IButtonSize.M} text="Принять" />;
    const addButton = <Button weight={TextWeight.Bold} size={IButtonSize.M} text="Добавить" />;

    return (
        <BottomSheetScrollView>
            <Container left={gap.m} right={gap.m} top={gap.s} bottom={gap['4xl']}>
                <Text weight={TextWeight.Black} size={TextSize.ModalTitle}>
                    добавить друзей
                </Text>
                <GapView top={gap.s}>
                    <SourceButton Icon={PencilIcon} text="ПО НИКНЕЙМУ" onClick={onAddByNickname} />
                </GapView>
                <GapView top={gap.s}>
                    <SourceButton
                        Icon={AddressBookIcon}
                        text="ИЗ КОНТАКТОВ"
                        onClick={() => {
                            // TODO
                        }}
                    />
                </GapView>
                <GapView top={gap.m}>
                    <GapView>
                        <Text weight={TextWeight.Black}>ЗАЯВКИ В ДРУЗЬЯ</Text>
                    </GapView>
                    {requests.map(user => {
                        return (
                            <GapView top={gap.xs} key={user.uuid}>
                                <UserListRow
                                    name={user.displayName}
                                    friendsAmount={user.friendsAmount}
                                    button={acceptButton}
                                />
                            </GapView>
                        );
                    })}
                </GapView>
                <GapView top={gap.m}>
                    <GapView>
                        <Text weight={TextWeight.Black}>ВОЗМОЖНЫЕ ДРУЗЬЯ</Text>
                    </GapView>
                    {recommendations.map(user => {
                        return (
                            <GapView top={gap.xs} key={user.uuid}>
                                <UserListRow
                                    name={user.displayName}
                                    friendsAmount={user.friendsAmount}
                                    button={addButton}
                                />
                            </GapView>
                        );
                    })}
                </GapView>
            </Container>
        </BottomSheetScrollView>
    );
};

export const AddFriendsModal = withModalWindow(
    ADD_FRIENDS_MODAL_NAME,
    {
        index: 0,
        snapPoints: ['95%'],
        backgroundStyle: {
            backgroundColor: color.purple50,
        },
    },
    AddFriendsModalContent,
);
