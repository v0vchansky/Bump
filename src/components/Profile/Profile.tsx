import * as React from 'react';
import { View } from 'react-native';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { gap } from '~/features/ui-kit/constants';

import { ProfileAvatar } from './Avatar/Avatar';
import { ProfileControlButton } from './ControlButton/ControlButton';
import { styles } from './styles';
import { IProfileProps } from './types';

export const Profile: React.FC<IProfileProps> = ({ uuid, displayName, userName, relationType, avatarUrl }) => {
    return (
        <View style={styles.root}>
            <GapView right={gap.m}>
                <View style={styles.info}>
                    <GapView bottom={gap.xxs} top={gap.xs}>
                        <Text weight={TextWeight.Black} size={TextSize.ProfileDisplayName}>
                            {displayName}
                        </Text>
                    </GapView>
                    <View style={styles.username}>
                        <Text size={TextSize.S}>@{userName.toLocaleLowerCase()}</Text>
                    </View>
                    <GapView top={gap.s}>
                        <ProfileControlButton relationType={relationType} uuid={uuid} />
                    </GapView>
                </View>
            </GapView>
            <ProfileAvatar uuid={uuid} displayName={displayName} avatarUrl={avatarUrl} />
        </View>
    );
};
