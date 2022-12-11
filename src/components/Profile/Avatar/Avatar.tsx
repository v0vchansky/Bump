import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { Avatar } from '~/components/Avatar/Avatar';

import { useAvatarHandlers } from './hooks';

interface IProps {
    uuid: string;
    avatarUrl: string | null;
    displayName: string;
}

export const ProfileAvatar: React.FC<IProps> = ({ uuid, avatarUrl, displayName }) => {
    const { activeOpacity, onAvatarClick } = useAvatarHandlers(avatarUrl, uuid);

    return (
        <TouchableOpacity activeOpacity={activeOpacity} onPress={onAvatarClick}>
            <Avatar size="profile" avatarUrl={avatarUrl} displayName={displayName} />
        </TouchableOpacity>
    );
};
