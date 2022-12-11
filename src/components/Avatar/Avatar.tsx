import * as React from 'react';
import { Image, View } from 'react-native';

import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color } from '~/features/ui-kit/constants';

import { containerStyles, imageStyles, styles } from './styles';
import { IProps } from './types';

export const Avatar: React.FC<IProps> = ({ avatarUrl, displayName, size }) => {
    const [isDefault, setIsDefault] = React.useState(true);

    return (
        <View style={[containerStyles.avatarContainer, containerStyles[size]]}>
            {avatarUrl && (
                <Image
                    onError={() => setIsDefault(true)}
                    onLoad={() => {
                        setIsDefault(false);
                    }}
                    source={{ uri: avatarUrl }}
                    style={[imageStyles.main, imageStyles[size]]}
                />
            )}
            {(!avatarUrl || isDefault) && (
                <View style={[styles.withoutAvatar, imageStyles[size]]}>
                    <Text
                        color={color.white}
                        size={size === 'profile' ? TextSize.XL : TextSize.M}
                        weight={TextWeight.Black}
                    >
                        {displayName[0]}
                    </Text>
                </View>
            )}
        </View>
    );
};
