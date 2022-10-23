import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { SafeAreaView } from '~/components/SafeAreaView/SafeAreaView';
import { logout } from '~/features/auth/store/actions';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { BackgroundGeolocationService } from '~/services/BackgroundGeolocationService/BackgroundGeolocationService';

import { styles } from './styles';

export const AttrControllerLayer: React.FC = () => {
    const dispatch = useDispatch();

    const onClick = React.useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <View style={styles.root} pointerEvents="box-none">
            <SafeAreaView pointerEvents="box-none">
                <View style={styles.content} pointerEvents="box-none">
                    <View pointerEvents="auto">
                        <TouchableOpacity onPress={onClick}>
                            <Text>Выйти</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            <BackgroundGeolocationService />
        </View>
    );
};
