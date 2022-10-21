import * as React from 'react';
import { View } from 'react-native';

import { SafeAreaView } from '~/components/SafeAreaView/SafeAreaView';

import { AuthTitle } from '../../components/AuthTitle/AuthTitle';
import { AuthForm } from '../../components/forms/AuthForm/AuthForm';

import { styles } from './styles';

export const AuthPage: React.FC = () => {
    return (
        <View style={styles.root}>
            <SafeAreaView>
                <View style={styles.container}>
                    <AuthTitle>Авторизация</AuthTitle>
                    <AuthForm />
                </View>
            </SafeAreaView>
        </View>
    );
};
