import * as React from 'react';
import { Image, Keyboard, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { RelationsList as RelationsListComponent } from '~/components/RelationsList/RelationsList';
import { Container } from '~/features/ui-kit/components/Container/Container';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Loader } from '~/features/ui-kit/components/Loader/Loader';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { TextInput } from '~/features/ui-kit/components/TextInput/TextInput';
import { color, gap } from '~/features/ui-kit/constants';
import { ApiResponseStatus } from '~/models/apiResponse';
import { withModalWindow } from '~/overlays/ModalWindow/withModalWindow';
import { reset, searchByUsername } from '~/store/search/actions';
import { getResponseStatus, getSearchResult } from '~/store/search/selectors';

import SearchIcon from '../../../../../assets/icons/search.svg';
import MonsterBrain from '../../../../../assets/images/monster-brain.png';
import MonsterNotFound from '../../../../../assets/images/monster-notfound.png';

import { styles } from './styles';

export const ADD_FRIEND_BY_USERNAME_MODAL_NAME = 'add-friend-by-username-modal';

export const AddFriendByUsernameModalContent: React.FC = () => {
    const dispatch = useDispatch();

    const [formValue, setFormValue] = React.useState<string>('');

    const onChange = React.useCallback((value: string) => {
        if (/^[A-Za-z0-9._]+$/.test(value) || value === '') {
            setFormValue(value.toLocaleLowerCase());
        }
    }, []);

    const onSubmit = React.useCallback(() => {
        dispatch(searchByUsername(formValue));
    }, [dispatch, formValue]);

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

    const disabled = formValue.length === 0 || isLoading;

    return (
        <Container left={gap.m} right={gap.m} top={gap.s}>
            <Text weight={TextWeight.Black} size={TextSize.ModalTitle}>
                найди друга
            </Text>
            <GapView top={gap.s} bottom={gap.m}>
                <View style={styles.searchRow}>
                    <View style={styles.textInput}>
                        <View style={{ flex: 1 }}>
                            <TextInput size="l" value={formValue} onChange={onChange} placeholder="v0vchansky" />
                        </View>
                        <TouchableOpacity
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: `rgba(64, 100, 222, ${disabled ? 0.85 : 1})`,
                            }}
                            activeOpacity={0.85}
                            disabled={disabled}
                            onPress={onSubmit}
                        >
                            {isLoading ? (
                                <Loader dark={false} />
                            ) : (
                                <SearchIcon width={32} height={32} fill={color.slate900} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </GapView>
            <RelationsListComponent isLoading={isLoading} relations={searchResult} />
            {responseStatus === ApiResponseStatus.NotStarted && (
                <GapView top={gap.xxl}>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <Image source={MonsterBrain} style={{ width: 300, height: 300 }} />
                        <GapView top={gap.xxxs}>
                            <Text weight={TextWeight.Black} size={TextSize.M} color={color.slate500}>
                                кто ищет — тот всегда найдёт
                            </Text>
                        </GapView>
                    </View>
                </GapView>
            )}
            {isNotFound && (
                <GapView top={gap.xxl}>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <Image source={MonsterNotFound} style={{ width: 300, height: 300 }} />
                        <GapView top={gap.xxxs}>
                            <Text align="center" weight={TextWeight.Black} size={TextSize.M} color={color.slate500}>
                                Пока еще нет никого с таким{'\n'}никнеймом :(
                            </Text>
                        </GapView>
                    </View>
                </GapView>
            )}
        </Container>
    );
};

export const AddFriendByUsernameModal = withModalWindow(
    ADD_FRIEND_BY_USERNAME_MODAL_NAME,
    { index: 0, snapPoints: ['95%'], backgroundStyle: { backgroundColor: color.white } },
    AddFriendByUsernameModalContent,
);
