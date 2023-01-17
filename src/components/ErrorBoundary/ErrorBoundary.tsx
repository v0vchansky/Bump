import * as React from 'react';
import { ErrorBoundary as NativeErrorBoundary } from 'react-error-boundary';
import { Image, View } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

import { GapView } from '~/features/ui-kit/components/GapView/GapView';
import { Text } from '~/features/ui-kit/components/Text/Text';
import { TextSize, TextWeight } from '~/features/ui-kit/components/Text/types';
import { color, gap } from '~/features/ui-kit/constants';

import MonsterError from '../../../assets/images/monster-error.png';
import { SafeAreaView } from '../SafeAreaView/SafeAreaView';

import { styles } from './styles';

interface IProps {
    children: React.ReactElement;
}

const ErrorFallback: React.FC = () => {
    return (
        <View style={styles.layout}>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <GapView bottom={gap.l}>
                            <Text size={TextSize.XL} color={color.primary} weight={TextWeight.Bold} align="center">
                                Ой, что-то пошло{'\n'}не так...
                            </Text>
                        </GapView>
                        <Image source={MonsterError} style={styles.image} />
                        <GapView top={gap.xxxl}>
                            <Text size={TextSize.XL} color={color.primary} weight={TextWeight.Regular} align="center">
                                Перезагрузи меня
                            </Text>
                        </GapView>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

export class ErrorBoundary extends React.Component<IProps> {
    state = { hasError: false };

    createGlobalHandler = () => {
        const defaultGlobalHandler = ErrorUtils.getGlobalHandler();

        return (error: Error, isFatal?: boolean) => {
            if (!__DEV__ && isFatal) {
                this.setState({ hasError: true });
                crashlytics().recordError(error);

                return;
            }

            defaultGlobalHandler(error, isFatal);
        };
    };

    componentDidMount() {
        ErrorUtils.setGlobalHandler(this.createGlobalHandler());
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFallback />;
        }

        return <NativeErrorBoundary FallbackComponent={ErrorFallback}>{this.props.children}</NativeErrorBoundary>;
    }
}
