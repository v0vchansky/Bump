import { AuthCodeModal } from '~/features/auth/components/AuthCodeModal/AuthCodeModal';
import { AddFriendByUsernameModal } from '~/features/mapScreen/components/AddFriendByUsernameModal/AddFriendByUsernameModal';
import { AddFriendsModal } from '~/features/mapScreen/components/AddFriendsModal/AddFriendsModal';
import { MyProfileModal } from '~/features/mapScreen/components/MyProfileModal/MyProfileModal';
import { SettingsModal } from '~/features/mapScreen/components/SettingsModal/SettingsModal';

export const modalWindowRegistry = [
    AuthCodeModal,
    MyProfileModal,
    AddFriendsModal,
    AddFriendByUsernameModal,
    SettingsModal,
];
