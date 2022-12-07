import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Profile } from '~/components/Profile/Profile';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { color, gap } from '~/features/ui-kit/constants';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';
import { getUserProfileInfo } from '~/store/user/actions';
import { getProfileInfo } from '~/store/user/selectors/common';
import { getFriendships, getIsMyProfileLoading } from '~/store/user/selectors/me';

export const MY_PROFILE_MODAL_NAME = 'my-profile-modal';

export const MyProfileModalContent: React.FC = () => {
    const dispatch = useDispatch();

    const profile = useSelector(getProfileInfo);

    const friendships = useSelector(getFriendships);

    const isLoading = useSelector(getIsMyProfileLoading);

    React.useEffect(() => {
        dispatch(getUserProfileInfo());
    }, []);

    if (!profile || !profile.displayName || !profile.userName) {
        return null;
    }

    return (
        <Container left={gap.m} right={gap.m} top={gap.s}>
            <Profile
                isLoading={isLoading}
                displayName={profile.displayName}
                userName={profile.userName}
                friends={friendships}
            />
        </Container>
    );
};

export const MyProfileModal = withModalWindow(
    MY_PROFILE_MODAL_NAME,
    { index: 0, snapPoints: ['95%'], backgroundStyle: { backgroundColor: color.purple50 } },
    MyProfileModalContent,
);
