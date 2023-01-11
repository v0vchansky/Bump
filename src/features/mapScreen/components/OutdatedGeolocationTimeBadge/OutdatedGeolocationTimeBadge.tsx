import * as React from 'react';
import { View } from 'react-native';

import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color } from '~/features/ui-kit/constants';
import { Duration } from '~/models/datefns';

import ClockFilledIcon from '../../../../../assets/icons/clock-filled.svg';

import { styles } from './styles';

interface IProps {
    duration: Duration;
}

export const OutdatedGeolocationTimeBadge: React.FC<IProps> = ({ duration }) => {
    const text = React.useMemo(() => {
        if (duration.years) {
            return `${duration.years} Л. НАЗАД`;
        } else if (duration.months) {
            return `${duration.months} МЕС. НАЗАД`;
        } else if (duration.weeks) {
            return `${duration.weeks} НЕД. НАЗАД`;
        } else if (duration.days) {
            return `${duration.days} ДН. НАЗАД`;
        } else if (duration.hours) {
            return `${duration.hours} Ч. НАЗАД`;
        } else if (duration.minutes) {
            return `${duration.minutes} МИН. НАЗАД`;
        } else {
            return 'НЕДАВНО';
        }
    }, [duration]);

    return (
        <View style={styles.root}>
            <View style={styles.iconRoot}>
                <ClockFilledIcon width={12} height={12} fill={color.white} />
            </View>
            <Text color={color.white} numberOfLines={1} weight={TextWeight.Bold} size={TextSize.XS}>
                {text}
            </Text>
        </View>
    );
};
