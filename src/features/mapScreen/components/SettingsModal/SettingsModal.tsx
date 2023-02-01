import * as React from 'react';
import { Linking } from 'react-native';
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

import BookIcon from '../../../../../assets/icons/book.svg';
import EarthIcon from '../../../../../assets/icons/earth.svg';
import EnvelopeIcon from '../../../../../assets/icons/envelope.svg'
import FootprintsIcon from '../../../../../assets/icons/footprints.svg';
import GhostIcon from '../../../../../assets/icons/ghost.svg';
import PrivacyIcon from '../../../../../assets/icons/privacy.svg';
import RemoveIcon from '../../../../../assets/icons/remove.svg';
import SignOutAltIcon from '../../../../../assets/icons/sign-out-alt.svg';

export const SETTINGS_MODAL_NAME = 'settings-modal';

export const SettingsModalContent: React.FC = () => {
    const dispatch = useDispatch();

    const { dismissAll } = useBottomSheetModal();

    const onLogout = React.useCallback(() => {
        dispatch(logout());
        dismissAll();
    }, [dismissAll, dispatch]);

    const onContacts = React.useCallback(() => {
        Linking.openURL('https://contacts.bump-family.ru/')
    }, []);

    const onRules = React.useCallback(() => {
        Linking.openURL('https://rules.bump-family.ru/')
    }, []);

    const onPrivacy = React.useCallback(() => {
        Linking.openURL('https://privacy.bump-family.ru/')
    }, []);

    const onDeleteProfile = React.useCallback(() => {
        Linking.openURL('https://delete-profile.bump-family.ru/')
    }, []);

    return (
        <Container left={gap.m} right={gap.m} top={gap.s}>
            <Text weight={TextWeight.Black} size={TextSize.ModalTitle}>
                настройки
            </Text>
            {/* <GapView top={gap.s}>
                <SourceButton Icon={FootprintsIcon} text="СЛЕДЫ: СКОРО" disabled onClick={undefined} />
            </GapView>
            <GapView top={gap.s}>
                <SourceButton Icon={GhostIcon} text="НЕВИДИМКА: СКОРО" disabled onClick={undefined} />
            </GapView>
            <GapView top={gap.s}>
                <SourceButton Icon={EarthIcon} text="НАСТРОЙКИ КАРТЫ: СКОРО" disabled onClick={undefined} />
            </GapView> */}
            <GapView top={gap.s}>
                <SourceButton Icon={EnvelopeIcon} text="СВЯЗАТЬСЯ С НАМИ" onClick={onContacts} />
            </GapView>
            <GapView top={gap.s}>
                <SourceButton Icon={BookIcon} text="ПРАВИЛА" onClick={onRules} />
            </GapView>
            <GapView top={gap.s}>
                <SourceButton Icon={PrivacyIcon} text="КОНФИДЕНЦИАЛЬНОСТЬ" onClick={onPrivacy} />
            </GapView>
            <GapView top={gap.xxxl}>
                <SourceButton Icon={RemoveIcon} text="УДАЛИТЬ АККАУНТ" onClick={onDeleteProfile} />
            </GapView>
            <GapView top={gap.s}>
                <SourceButton Icon={SignOutAltIcon} text="ВЫЙТИ" onClick={onLogout} />
            </GapView>
        </Container>
    );
};

export const SettingsModal = withModalWindow(
    SETTINGS_MODAL_NAME,
    { index: 0, snapPoints: ['95%'], backgroundStyle: { backgroundColor: color.white } },
    SettingsModalContent,
);
