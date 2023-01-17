import * as React from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { SafeAreaView } from '~/components/SafeAreaView/SafeAreaView';

import { AuthForm } from '../../components/forms/AuthForm/AuthForm';

import { styles } from './styles';

export const AuthPage: React.FC = () => {
    React.useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <View style={styles.root}>
            <SafeAreaView>
                <View style={styles.container}>
                    <AuthForm />
                </View>
            </SafeAreaView>
        </View>
    );
};
