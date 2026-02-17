import { loginSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../stores/auth-store';
import { LoginCredentials } from '../../../types/auth';
import { LoginPresentation } from './LoginPresentation';



export const LoginContainer: React.FC = () => {
    const router = useRouter();
    const { login, isLoading } = useAuthStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
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
            router.replace('/(tabs)/courses');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Invalid credentials';
            Alert.alert('Login Failed', message);
        }
    };

    const handleRegisterPress = () => {
        router.push('/(auth)/register');
    };

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
