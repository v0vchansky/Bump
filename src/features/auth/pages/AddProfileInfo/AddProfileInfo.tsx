import * as React from 'react';
import { View } from 'react-native';

import { SafeAreaView } from '~/components/SafeAreaView/SafeAreaView';

import { AddProfileInfoForm } from '../../components/forms/AddProfileInfoForm/AddProfileInfoForm';

import { styles } from './styles';

export const AddProfileInfo: React.FC = () => {
    return (
        <View style={styles.root}>
            <SafeAreaView>
                <View style={styles.container}>
                    <AddProfileInfoForm />
                </View>
            </SafeAreaView>
        </View>
    );
};
