import { AuthCodeModal } from '~/features/auth/components/AuthCodeModal/AuthCodeModal';
import { AddFriendByUsernameModal } from '~/features/mapScreen/components/AddFriendByUsernameModal/AddFriendByUsernameModal';
import { AddFriendsModal } from '~/features/mapScreen/components/AddFriendsModal/AddFriendsModal';
import { ProfileModal } from '~/features/mapScreen/components/ProfileModal/ProfileModal';
import { SettingsModal } from '~/features/mapScreen/components/SettingsModal/SettingsModal';

export const modalWindowRegistry = [
    AuthCodeModal,
    AddFriendsModal,
    AddFriendByUsernameModal,
    SettingsModal,
    ProfileModal,
];
