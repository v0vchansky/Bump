import * as React from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { RelationsList } from '~/components/RelationsList/RelationsList';
import { ShareBannerButton } from '~/components/ShareBannerButton/ShareBannerButton';
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
    getOutgoingFriendRequests as getOutgoingFriendRequestsSelector,
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
    const isIncomingRequestsLoading = React.useMemo(
        () => incomingRequestsResponseStatus === ApiResponseStatus.Loading,
        [incomingRequestsResponseStatus],
    );

    const outgoingRequests = useSelector(getOutgoingFriendRequestsSelector);
    const outgoingRequestsResponseStatus = useSelector(getIncomingFriendRequestsStatus);
    const isOutgoingRequestsLoading = React.useMemo(
        () => outgoingRequestsResponseStatus === ApiResponseStatus.Loading,
        [outgoingRequestsResponseStatus],
    );

    const isIncomingRequestsVisible = incomingRequests.length > 0 || isIncomingRequestsLoading;
    const isOutgoingRequestsVisible = outgoingRequests.length > 0 || isOutgoingRequestsLoading;

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const inAnimation = React.useRef(false);

    return (
        <BottomSheetScrollView
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
            onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                if (event.nativeEvent.contentOffset.y < 1) {
                    if (!inAnimation.current) {
                        inAnimation.current = true;

                        Animated.timing(fadeAnim, {
                            toValue: 0,
                            duration: 50,
                            useNativeDriver: true,
                        }).start(() => (inAnimation.current = false));
                    }
                } else {
                    if (!inAnimation.current) {
                        inAnimation.current = true;

                        Animated.timing(fadeAnim, {
                            toValue: 0.3,
                            duration: 50,
                            useNativeDriver: true,
                        }).start(() => (inAnimation.current = false));
                    }
                }
            }}
        >
            <View
                style={{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                    shadowOpacity: fadeAnim as unknown as number,
                    shadowRadius: 3.84,

                    elevation: 5,

                    backgroundColor: color.white,
                }}
            >
                <Container left={gap.m} right={gap.m} top={gap.s} bottom={gap.xs}>
                    <Text weight={TextWeight.Black} size={TextSize.ModalTitle}>
                        добавить друзей
                    </Text>
                </Container>
            </View>
            <Container left={gap.m} right={gap.m} bottom={gap['4xl']}>
                <GapView top={gap.xxs}>
                    <SourceButton Icon={PencilIcon} text="ПО НИКНЕЙМУ" onClick={onAddByNickname} />
                    <GapView top={gap.s}>
                        <SourceButton Icon={AddressBookIcon} text="КОНТАКТЫ: СКОРО" disabled onClick={undefined} />
                    </GapView>
                    <GapView top={gap.m}>
                        <ShareBannerButton />
                    </GapView>
                </GapView>
                {isIncomingRequestsVisible && (
                    <GapView top={gap.s}>
                        <RelationsList
                            isLoading={isIncomingRequestsLoading}
                            title="ЗАЯВКИ В ДРУЗЬЯ"
                            relations={incomingRequests}
                            skeletonMinElements={2}
                            skeletonMaxElements={4}
                        />
                    </GapView>
                )}
                {isOutgoingRequestsVisible && (
                    <GapView top={gap.m}>
                        <RelationsList
                            isLoading={isOutgoingRequestsLoading}
                            title="ИСХОДЯЩИЕ ЗАЯВКИ"
                            relations={outgoingRequests}
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
            backgroundColor: color.white,
        },
    },
    AddFriendsModalContent,
);
