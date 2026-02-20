import { ROUTES } from '@/constants/router';
import useOrientation from '@/hooks/use-orientation';
import { LoginData, loginSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useAuth } from '../../../hooks/use-auth';
import { LoginPresentation } from './LoginPresentation';

// This is the container component for the login screen.
// It handles the login logic and presentation.

export const LoginContainer: React.FC = () => {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const orientation = useOrientation();

    const {
        control,
        handleSubmit,
        reset
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginData) => {
        try {
            await login(data);
            reset();
            router.replace(ROUTES.tabs.courses);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Invalid credentials';
            Alert.alert('Login Failed', message);
        }
    };

    const handleRegisterPress = useCallback(() => {
        router.push(ROUTES.auth.register);
    }, [router]);

    return (
        <LoginPresentation
            orientation={orientation}
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            onRegisterPress={handleRegisterPress}
        />
    );
};
