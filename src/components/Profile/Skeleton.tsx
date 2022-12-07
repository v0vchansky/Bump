import * as React from 'react';
import { View } from 'react-native';
import { Skeleton as SkeletonComponent } from 'react-native-skeletons';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { color, gap, rounded } from '~/features/ui-kit/constants';

import { styles } from './styles';

export const Skeleton: React.FC = () => {
    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <SkeletonComponent borderRadius={rounded['3xs']} width={110} height={110} color={color.slate300} />
                <GapView left={gap.m}>
                    <View style={styles.info}>
                        <SkeletonComponent
                            borderRadius={rounded['5xs']}
                            width={200}
                            height={35}
                            color={color.slate300}
                        />
                        <GapView top={gap.xs}>
                            <SkeletonComponent
                                borderRadius={rounded['5xs']}
                                width={150}
                                height={20}
                                color={color.slate300}
                            />
                        </GapView>
                    </View>
                </GapView>
            </View>
        </View>
    );
};
