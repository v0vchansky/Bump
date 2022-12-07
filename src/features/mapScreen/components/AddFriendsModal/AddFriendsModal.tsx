import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { RelationsList } from '~/components/RelationsList/RelationsList';
import { SourceButton } from '~/components/SourceButton/SourceButton';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { ApiResponseStatus } from '~/models/apiResponse';
import { openByName } from '~/overlays/ModalWindow/store/actions';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';
import { getIncomingFriendRequests } from '~/store/user/actions';
import {
    getIncomingFriendRequests as getIncomingFriendRequestsSelector,
    getIncomingFriendRequestsStatus,
} from '~/store/user/selectors/me';

import AddressBookIcon from '../../../../../assets/icons/address-book.svg';
import PencilIcon from '../../../../../assets/icons/pencil.svg';
import { ADD_FRIEND_BY_USERNAME_MODAL_NAME } from '../AddFriendByUsernameModal/AddFriendByUsernameModal';

export const ADD_FRIENDS_MODAL_NAME = 'add-friends-modal';

export const AddFriendsModalContent: React.FC = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getIncomingFriendRequests());
    }, []);

    const onAddByNickname = React.useCallback(() => {
        dispatch(openByName(ADD_FRIEND_BY_USERNAME_MODAL_NAME));
    }, [dispatch]);

    const incomingRequests = useSelector(getIncomingFriendRequestsSelector);
    const incomingRequestsResponseStatus = useSelector(getIncomingFriendRequestsStatus);
    const isLoading = React.useMemo(
        () => incomingRequestsResponseStatus === ApiResponseStatus.Loading,
        [incomingRequestsResponseStatus],
    );

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
                {(Boolean(incomingRequests.length) || isLoading) && (
                    <GapView top={gap.m}>
                        <RelationsList
                            isLoading={isLoading}
                            title="ЗАЯВКИ В ДРУЗЬЯ"
                            relations={incomingRequests}
                            skeletonMinElements={2}
                            skeletonMaxElements={4}
                        />
                    </GapView>
                )}
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
