import * as React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { SafeAreaView } from '~/components/SafeAreaView/SafeAreaView';
import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonWidth } from '~/features/ui-kit/components/Button/types';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';
import { redirectToPageWithoutHistory } from '~/store/router/actions';

import LogoIcon from '../../../../../assets/icons/logo.svg';
import { PageName } from '../../../../router/pageName';

import { styles } from './styles';

export const HelloPage: React.FC = () => {
    const dispatch = useDispatch();

    const onClick = React.useCallback(() => {
        dispatch(redirectToPageWithoutHistory(PageName.Auth));
    }, [dispatch]);

    return (
        <View style={styles.root}>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <GapView>
                            <View style={styles.logo}>
                                <LogoIcon width={150} height={150} />
                                <View style={styles.logoText}>
                                    <Text color={color.black} weight={TextWeight.Black} size={TextSize.HelloPage}>
                                        BUMP
                                    </Text>
                                </View>
                            </View>
                        </GapView>
                        <GapView bottom={gap['4xl']}>
                            <Button
                                isItalicText
                                width={IButtonWidth.Max}
                                size={IButtonSize.L}
                                weight={TextWeight.Black}
                                text="НАЧАТЬ"
                                onClick={onClick}
                            />
                        </GapView>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};
