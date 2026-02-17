import { ROUTES } from '@/constants/router';
import { loginSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useAuth } from '../../../hooks/use-auth';
import { LoginCredentials } from '../../../types/auth';
import { LoginPresentation } from './LoginPresentation';



export const LoginContainer: React.FC = () => {
    const router = useRouter();
    const { login, isLoading } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginCredentials>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginCredentials) => {
        try {
            await login(data);
            // empty the form
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
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            errors={errors}
            onRegisterPress={handleRegisterPress}
        />
    );
};
