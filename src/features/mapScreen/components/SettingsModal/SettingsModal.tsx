import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';

import { SourceButton } from '~/components/SourceButton/SourceButton';
import { logout } from '~/features/auth/store/actions';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';

import SignOutAltIcon from '../../../../../assets/icons/sign-out-alt.svg';

export const SETTINGS_MODAL_NAME = 'settings-modal';

export const SettingsModalContent: React.FC = () => {
    const dispatch = useDispatch();

    const { dismissAll } = useBottomSheetModal();

    const onLogout = React.useCallback(() => {
        dispatch(logout());
        dismissAll();
    }, [dismissAll, dispatch]);

    return (
        <Container left={gap.m} right={gap.m} top={gap.s}>
            <Text weight={TextWeight.Black} size={TextSize.ModalTitle}>
                настройки
            </Text>
            <GapView top={gap.s}>
                <SourceButton Icon={SignOutAltIcon} text="ВЫЙТИ" onClick={onLogout} />
            </GapView>
        </Container>
    );
};

export const SettingsModal = withModalWindow(
    SETTINGS_MODAL_NAME,
    { index: 0, snapPoints: ['95%'], backgroundStyle: { backgroundColor: color.purple50 } },
    SettingsModalContent,
);
