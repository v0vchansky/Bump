import * as React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { SafeAreaView } from '~/components/SafeAreaView/SafeAreaView';
import { Button } from '~/features/ui-kit/components/Button/Button';
import { IButtonSize, IButtonType } from '~/features/ui-kit/components/Button/types';
import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { color, gap } from '~/features/ui-kit/constants';
import { openByName } from '~/overlays/ModalWindow/store/actions';
import { BackgroundGeolocationService } from '~/services/BackgroundGeolocationService/BackgroundGeolocationService';

import MyLocationIcon from '../../../../../assets/icons/my-location.svg';
import Portrait from '../../../../../assets/icons/portrait.svg';
import SettingsIcon from '../../../../../assets/icons/settings.svg';
import UserAddIcon from '../../../../../assets/icons/user-add.svg';
import { ADD_FRIENDS_MODAL_NAME } from '../AddFriendsModal/AddFriendsModal';
import { MY_PROFILE_MODAL_NAME } from '../MyProfileModal/MyProfileModal';
import { SETTINGS_MODAL_NAME } from '../SettingsModal/SettingsModal';

import { styles } from './styles';

export const ControlsLayer: React.FC = () => {
    const dispatch = useDispatch();

    const onClickProfileButton = React.useCallback(() => {
        dispatch(openByName(MY_PROFILE_MODAL_NAME));
    }, [dispatch]);

    const onClickAddFriendsButton = React.useCallback(() => {
        dispatch(openByName(ADD_FRIENDS_MODAL_NAME));
    }, []);

    const onOpenSettings = React.useCallback(() => {
        dispatch(openByName(SETTINGS_MODAL_NAME));
    }, []);

    return (
        <View style={styles.root} pointerEvents="box-none">
            <SafeAreaView pointerEvents="box-none">
                <View style={styles.content} pointerEvents="box-none">
                    <View style={styles.profileControls} pointerEvents="auto">
                        <GapView right={gap.m} top={gap.m}>
                            <Button
                                size={IButtonSize.Auto}
                                type={IButtonType.Transparent}
                                onClick={onClickProfileButton}
                            >
                                <Portrait width={24} height={24} fill={color.black} />
                            </Button>
                        </GapView>
                        <GapView right={gap.m} top={gap.xs}>
                            <Button
                                size={IButtonSize.Auto}
                                type={IButtonType.Transparent}
                                onClick={onClickAddFriendsButton}
                            >
                                <UserAddIcon width={24} height={24} fill={color.black} />
                            </Button>
                        </GapView>
                        <GapView right={gap.m} top={gap.xs}>
                            <Button size={IButtonSize.Auto} type={IButtonType.Transparent} onClick={onOpenSettings}>
                                <SettingsIcon width={24} height={24} fill={color.black} />
                            </Button>
                        </GapView>
                    </View>
                    <View style={styles.bottomBar} pointerEvents="auto">
                        <Button
                            type={IButtonType.Transparent}
                            size={IButtonSize.Auto}
                            onClick={() => {
                                // TODO
                            }}
                        >
                            <MyLocationIcon width={45} height={45} fill={color.slate900} opacity={0.5} />
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
            <BackgroundGeolocationService />
        </View>
    );
};
