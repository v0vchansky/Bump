import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { Profile } from '~/components/Profile/Profile';
import { RelationsList } from '~/components/RelationsList/RelationsList';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { color, gap } from '~/features/ui-kit/constants';
import { ApiResponseStatus } from '~/models/apiResponse';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';
import { resetProfilesStack } from '~/store/search/actions';
import { IProfilesStackItem } from '~/store/search/models';
import { getProfilesStack, getProfileStackResponseStatus } from '~/store/search/selectors';
import { getProfileRelationType } from '~/store/user/selectors/relations';
import { commonVariants, pluralize } from '~/utils/pluralize';

import { ProfileModalTopControls } from './TopControls/TopControls';

export const PROFILE_MODAL_NAME = 'profile-modal';

export const ProfileModalContent: React.FC = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        return () => {
            dispatch(resetProfilesStack());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const profilesStack = useSelector(getProfilesStack);
    const profileStackResponseStatus = useSelector(getProfileStackResponseStatus);
    const isLoading = React.useMemo(
        () => profileStackResponseStatus === ApiResponseStatus.Loading,
        [profileStackResponseStatus],
    );

    const profileRelationType = useSelector(getProfileRelationType);

    if (!profilesStack.length) {
        return null;
    }

    const lastProfilesStackItem: IProfilesStackItem = profilesStack[profilesStack.length - 1];

    const { user, relations } = lastProfilesStackItem;

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
