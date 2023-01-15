import * as React from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { Profile } from '~/components/Profile/Profile';
import { RelationsList } from '~/components/RelationsList/RelationsList';
import { ShareBannerButton } from '~/components/ShareBannerButton/ShareBannerButton';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { color, gap } from '~/features/ui-kit/constants';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';
import { resetProfilesStack } from '~/store/search/actions';
import { getProfilesStackLastItem, getProfileStackIsLoading } from '~/store/search/selectors';
import { getMe } from '~/store/user/selectors/me';
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

    const profilesStackLastItem = useSelector(getProfilesStackLastItem);
    const isLoading = useSelector(getProfileStackIsLoading);
    const profileRelationType = useSelector(getProfileRelationType);

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const inAnimation = React.useRef(false);

    const me = useSelector(getMe);

    if (!profilesStackLastItem) {
        return null;
    }

    const { user, relations } = profilesStackLastItem;
    const isMe = me?.uuid === user.uuid;

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
                </Container>
            </View>
            <Container left={gap.m} right={gap.m} top={gap.xxs} bottom={gap['4xl']}>
                {isMe && (
                    <GapView bottom={gap.m}>
                        <ShareBannerButton />
                    </GapView>
                )}
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
            </Container>
        </BottomSheetScrollView>
    );
};

export const ProfileModal = withModalWindow(
    PROFILE_MODAL_NAME,
    { index: 0, snapPoints: ['95%'], backgroundStyle: { backgroundColor: color.white } },
    ProfileModalContent,
);
