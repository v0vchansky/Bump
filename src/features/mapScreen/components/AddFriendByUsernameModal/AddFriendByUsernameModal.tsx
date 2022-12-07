import * as React from 'react';
import { Keyboard, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RelationsList as RelationsListComponent } from '~/components/RelationsList/RelationsList';
import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonType } from '~/features/ui-kit/components/Button/types';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { TextInput } from '~/features/ui-kit/components/TextInput/TextInput';
import { color, gap } from '~/features/ui-kit/constants';
import { ApiResponseStatus } from '~/models/apiResponse';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';
import { reset } from '~/store/search/actions';
import { getResponseStatus, getSearchResult } from '~/store/search/selectors';

import SearchHeartIcon from '../../../../../assets/icons/search-heart.svg';

import { useForm } from './hooks';
import { styles } from './styles';

export const ADD_FRIEND_BY_USERNAME_MODAL_NAME = 'add-friend-by-username-modal';

export const AddFriendByUsernameModalContent: React.FC = () => {
    const dispatch = useDispatch();

    const { formValue, disabled, onChange, onSubmit } = useForm();

    const searchResult = useSelector(getSearchResult);
    const responseStatus = useSelector(getResponseStatus);
    const isLoading = responseStatus === ApiResponseStatus.Loading;

    React.useEffect(() => {
        return () => {
            Keyboard.dismiss();
            dispatch(reset());
        };
    }, []);

    const isNotFound =
        (searchResult.length === 0 && responseStatus === ApiResponseStatus.Error) ||
        (searchResult.length === 0 && responseStatus === ApiResponseStatus.Ok);

    return (
        <Container left={gap.m} right={gap.m} top={gap.s}>
            <Text weight={TextWeight.Black} size={TextSize.ModalTitle}>
                найди друга
            </Text>
            <GapView top={gap.s} bottom={gap.xs}>
                <View style={styles.searchRow}>
                    <View style={styles.textInput}>
                        <TextInput value={formValue} onChange={onChange} placeholder="никнейм" />
                    </View>
                    <GapView left={gap.xs}>
                        <Button
                            type={IButtonType.TransparentBordered}
                            onClick={onSubmit}
                            disabled={disabled || isLoading}
                            isLoading={isLoading}
                        >
                            <SearchHeartIcon width={24} height={24} fill={color.slate900} />
                        </Button>
                    </GapView>
                </View>
            </GapView>
            <RelationsListComponent isLoading={isLoading} fromSearch relations={searchResult} />
            {responseStatus === ApiResponseStatus.NotStarted && (
                <GapView top={gap.xxxs}>
                    <Text weight={TextWeight.Black} size={TextSize.M} color={color.slate500}>
                        кто ищет — тот всегда найдёт
                    </Text>
                </GapView>
            )}
            {isNotFound && (
                <GapView top={gap.xxxs}>
                    <Text weight={TextWeight.Black} size={TextSize.M} color={color.slate500}>
                        никого не нашел
                    </Text>
                </GapView>
            )}
        </Container>
    );
};

export const AddFriendByUsernameModal = withModalWindow(
    ADD_FRIEND_BY_USERNAME_MODAL_NAME,
    { index: 0, snapPoints: ['95%'], backgroundStyle: { backgroundColor: color.purple50 } },
    AddFriendByUsernameModalContent,
);
