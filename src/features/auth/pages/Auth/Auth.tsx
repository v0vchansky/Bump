import * as React from 'react';

import { color } from '~/features/ui-kit/constants';
import { ScreenLayoutDefault } from '~/hocs/ScreenLayout/ScreenLayout-Default';

import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { AuthTitle } from '../../components/AuthTitle/AuthTitle';
import { AuthForm } from '../../components/forms/AuthForm/AuthForm';

export const AuthPage: React.FC = () => {
    return (
        <ScreenLayoutDefault bgColor={color.pink50}>
            <AuthLayout>
                <AuthTitle>Авторизация</AuthTitle>
                <AuthForm />
            </AuthLayout>
        </ScreenLayoutDefault>
    );
};
