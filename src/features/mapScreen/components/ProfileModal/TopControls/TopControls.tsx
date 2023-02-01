import * as React from 'react';
import { Linking, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { color, gap } from '~/features/ui-kit/constants';
import { useRelationsActionSheetControls } from '~/hooks/useRelationsActionSheetControls';
import { prevProfile } from '~/store/search/actions';
import { RelationList } from '~/store/user/models';

import SettingsIcon from '../../../../../../assets/icons/settings.svg';
import SpeechBubbleWithExclamationMarkIcon from '../../../../../../assets/icons/speech-bubble-with-exclamation-mark.svg';
import UndoIcon from '../../../../../../assets/icons/undo.svg';

import { styles } from './styles';

interface IProps {
    uuid: string;
    displayName: string;
    relationType: RelationList | undefined;
}

const DEFAULT_ICONS_COLOR = color.slate600;
const DEFAULT_ICONST_LEFT_GAP = gap.m;

export const ProfileModalTopControls: React.FC<IProps> = ({ uuid, displayName, relationType }) => {
    const dispatch = useDispatch();

    const onBackClick = React.useCallback(() => {
        dispatch(prevProfile());
    }, [dispatch]);

    const onComplaint = React.useCallback(() => {
        Linking.openURL('https://complain.bump-family.ru/')
    }, []);

    const isSettingsVisible = React.useMemo(() => {
        switch (true) {
            case relationType === RelationList.IncomingFriendRequest:
            case relationType === RelationList.OutgoingFriendRequest:
            case relationType === RelationList.Friendship:
                return true;
            default:
                return false;
        }
    }, [relationType]);

    const onSettingsClick = useRelationsActionSheetControls({ uuid, displayName, relationType });

    return (
        <View style={styles.root}>
            <TouchableOpacity activeOpacity={0.85} onPress={onBackClick}>
                <UndoIcon width={24} height={24} fill={DEFAULT_ICONS_COLOR} />
            </TouchableOpacity>
            {isSettingsVisible && (
                <>
                    <GapView left={DEFAULT_ICONST_LEFT_GAP}>
                        <TouchableOpacity activeOpacity={0.85} onPress={onSettingsClick}>
                            <SettingsIcon width={24} height={24} fill={DEFAULT_ICONS_COLOR} />
                        </TouchableOpacity>
                    </GapView>
                    <GapView left={DEFAULT_ICONST_LEFT_GAP}>
                        <TouchableOpacity activeOpacity={0.85} onPress={onComplaint}>
                            <SpeechBubbleWithExclamationMarkIcon width={24} height={24} fill={DEFAULT_ICONS_COLOR} />
                        </TouchableOpacity>
                    </GapView>
                </>
            )}
        </View>
    );
};
