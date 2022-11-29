import * as React from 'react';
import { View } from 'react-native';

import { UserListRow } from '~/components/UserListRow/UserListRow';
import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonType } from '~/features/ui-kit/components/Button/types';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { TextInput } from '~/features/ui-kit/components/TextInput/TextInput';
import { color, gap } from '~/features/ui-kit/constants';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';

import SearchHeartIcon from '../../../../../assets/icons/search-heart.svg';

import { styles } from './styles';

export const ADD_FRIEND_BY_USERNAME_MODAL_NAME = 'add-friend-by-username-modal';

export const AddFriendByUsernameModalContent: React.FC = () => {
    const button = <Button weight={TextWeight.Bold} size={IButtonSize.M} text="Добавить" />;

    return (
        <Container left={gap.m} right={gap.m} top={gap.s}>
            <Text weight={TextWeight.Black} size={TextSize.ModalTitle}>
                найди друга
            </Text>
            <GapView top={gap.s} bottom={gap.xs}>
                <View style={styles.searchRow}>
                    <View style={styles.textInput}>
                        <TextInput
                            value=""
                            onChange={() => {
                                // TODO
                            }}
                            placeholder="никнейм"
                        />
                    </View>
                    <GapView left={gap.xs}>
                        <Button type={IButtonType.TransparentBordered}>
                            <SearchHeartIcon width={24} height={24} fill={color.slate900} />
                        </Button>
                    </GapView>
                </View>
            </GapView>
            <GapView top={gap.xs}>
                <UserListRow name="Дианка" friendsAmount={65} button={button} />
            </GapView>
            <GapView top={gap.xs}>
                <UserListRow name="Дианка" friendsAmount={65} button={button} />
            </GapView>
            <GapView top={gap.xs}>
                <UserListRow name="Дианка" friendsAmount={65} button={button} />
            </GapView>
            <GapView top={gap.xs}>
                <UserListRow name="Дианка" friendsAmount={65} button={button} />
            </GapView>
            <GapView top={gap.xs}>
                <UserListRow name="Дианка" friendsAmount={65} button={button} />
            </GapView>
            <GapView top={gap.xs}>
                <UserListRow name="Дианка" friendsAmount={65} button={button} />
            </GapView>
        </Container>
    );
};

export const AddFriendByUsernameModal = withModalWindow(
    ADD_FRIEND_BY_USERNAME_MODAL_NAME,
    { index: 0, snapPoints: ['95%'], backgroundStyle: { backgroundColor: color.purple50 } },
    AddFriendByUsernameModalContent,
);
