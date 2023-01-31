import * as React from 'react';
import { View } from 'react-native';

import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color } from '~/features/ui-kit/constants';
import { Duration } from '~/models/datefns';

import CheckIcon from '../../../../../assets/icons/check.svg';
import MarkerFilledIcon from '../../../../../assets/icons/marker-filled.svg';

import { styles } from './styles';

interface IProps {
    duration: Duration;
    speed: number;
}

const getSubTime = (number: number | undefined, text: string) => {
    if (number) {
        return ` ${number} ${text}`;
    }

    return '';
};

export const ActualGeolocationTimeBadge: React.FC<IProps> = ({ duration, speed }) => {
    const isInTheWay = speed && speed > 1;

    const text = React.useMemo(() => {
        let str;

        if (duration.years) {
            str = `${duration.years} Л.${getSubTime(duration.months, 'МЕС.')}`;
        } else if (duration.months) {
            str = `${duration.months} МЕС.${getSubTime(duration.weeks, 'НЕД.')}`;
        } else if (duration.weeks) {
            return `${duration.weeks} НЕД. ${getSubTime(duration.days, 'ДН.')}`;
        } else if (duration.days) {
            return `${duration.days} ДН. ${getSubTime(duration.hours, 'Ч.')}`;
        } else if (duration.hours) {
            return `${duration.hours} Ч. ${getSubTime(duration.minutes, 'МИН.')}`;
        } else if (duration.minutes) {
            return `${duration.minutes} МИН.`;
        } else {
            return isInTheWay ? `В ПУТИ ${Math.floor(speed)} КМ/Ч` : 'СЕЙЧАС';
        }

        return str;
    }, [duration, speed, isInTheWay]);

    return (
        <View style={styles.root}>
            <View style={styles.iconRoot}>
                {text === 'Сейчас' ? (
                    <CheckIcon width={16} height={16} fill={color.black} />
                ) : (
                    <MarkerFilledIcon width={16} height={16} fill={color.black} />
                )}
            </View>
            <Text color={color.slate900} numberOfLines={1} weight={TextWeight.Bold} size={TextSize.XS}>
                {text}
            </Text>
        </View>
    );
};
