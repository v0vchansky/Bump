import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { Profile } from '~/components/Profile/Profile';
import { RelationsList } from '~/components/RelationsList/RelationsList';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { color, gap } from '~/features/ui-kit/constants';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';
import { resetProfilesStack } from '~/store/search/actions';
import { getProfilesStackLastItem, getProfileStackIsLoading } from '~/store/search/selectors';
import { getProfileRelationType } from '~/store/user/selectors/relations';
import { commonVariants, pluralize } from '~/utils/pluralize';

import { ProfileModalTopControls } from './TopControls/TopControls';
import { useAvatarHandlers } from './hooks';

export const PROFILE_MODAL_NAME = 'profile-modal';

export const ProfileModalContent: React.FC = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        return () => {
            dispatch(resetProfilesStack());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const profilesStackLastItem = useSelector(getProfilesStackLastItem);
    const isLoading = useSelector(getProfileStackIsLoading);
    const profileRelationType = useSelector(getProfileRelationType);

    if (!profilesStackLastItem) {
        return null;
    }

    const { user, relations } = profilesStackLastItem;

    return (
        <BottomSheetScrollView>
            <Container left={gap.m} right={gap.m}>
                <GapView bottom={gap.m}>
                    <GapView bottom={gap.xxs}>
                        <ProfileModalTopControls
                            uuid={user.uuid}
                            displayName={user.displayName}
                            relationType={profileRelationType}
                        />
                    </GapView>
                    <Profile
                        uuid={user.uuid}
                        displayName={user.displayName}
                        userName={user.userName}
                        relationType={profileRelationType}
                        avatarUrl={user.avatarUrl}
                    />
                </GapView>
                <GapView top={gap.xxxs} bottom={gap['5xl']}>
                    {relations.length > 0 && (
                        <RelationsList
                            title={`${relations.length} ${pluralize(
                                relations.length,
                                commonVariants.friend,
                            ).toUpperCase()}`}
                            relations={relations}
                            isLoading={isLoading}
                        />
                    )}
                </GapView>
            </Container>
        </BottomSheetScrollView>
    );
};

export const ProfileModal = withModalWindow(
    PROFILE_MODAL_NAME,
    { index: 0, snapPoints: ['95%'], backgroundStyle: { backgroundColor: color.purple50 } },
    ProfileModalContent,
);
