import * as React from 'react';

import { Profile } from '~/components/Profile/Profile';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { color, gap } from '~/features/ui-kit/constants';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';

export const MY_PROFILE_MODAL_NAME = 'my-profile-modal';

const profile = {
    displayName: 'владимир',
    userName: 'v0vchansky',
    friends: [
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
    ],
};

export const MyProfileModalContent: React.FC = () => {
    return (
        <Container left={gap.m} right={gap.m} top={gap.s}>
            <Profile displayName={profile.displayName} userName={profile.userName} friends={profile.friends} />
        </Container>
    );
};

export const MyProfileModal = withModalWindow(
    MY_PROFILE_MODAL_NAME,
    { index: 0, snapPoints: ['95%'], backgroundStyle: { backgroundColor: color.purple50 } },
    MyProfileModalContent,
);
