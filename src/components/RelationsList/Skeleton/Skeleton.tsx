import * as React from 'react';
import { View } from 'react-native';
import { Skeleton as SkeletonComponent } from 'react-native-skeletons';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { color, gap, rounded } from '~/features/ui-kit/constants';
import { randomLengthIntagerArray } from '~/utils/random';

import { styles } from '../styles';

interface IProps {
    title?: string;

    skeletonMinElements?: number;
    skeletonMaxElements?: number;
}

export const Skeleton: React.FC<IProps> = ({ title, skeletonMaxElements, skeletonMinElements }) => {
    const array = React.useRef(randomLengthIntagerArray(skeletonMinElements || 5, skeletonMaxElements || 7));

    return (
        <View>
            {Boolean(title) && (
                <SkeletonComponent borderRadius={rounded['6xs']} width={90} height={20} color={color.slate300} />
            )}
            {array.current.map(key => {
                const firstItemGap = key === 0 && !title ? undefined : gap.xs;

                return (
                    <GapView top={firstItemGap} key={key}>
                        <View style={styles.listRow}>
                            <View style={styles.rowInfo}>
                                <SkeletonComponent
                                    borderRadius={rounded['6xs']}
                                    width={40}
                                    height={40}
                                    color={color.slate300}
                                />
                                <GapView left={gap.xs}>
                                    <View style={styles.desc}>
                                        <SkeletonComponent
                                            borderRadius={rounded['6xs']}
                                            width={90}
                                            height={16}
                                            color={color.slate300}
                                        />
                                        <GapView top={gap.xxxs}>
                                            <SkeletonComponent
                                                borderRadius={rounded['6xs']}
                                                width={135}
                                                height={16}
                                                color={color.slate300}
                                            />
                                        </GapView>
                                    </View>
                                </GapView>
                            </View>
                            <SkeletonComponent
                                borderRadius={rounded['5xs']}
                                width={100}
                                height={30}
                                color={color.slate300}
                            />
                        </View>
                    </GapView>
                );
            })}
        </View>
    );
};
