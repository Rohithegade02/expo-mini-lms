import { registerSchema } from '@/schema';
import { useAuthStore } from '@/stores/auth-store';
import { RegisterData } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { RegisterPresentation } from './RegisterPresentation';



export const RegisterContainer: React.FC = () => {
    const router = useRouter();
    const { register, isLoading } = useAuthStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            role: 'USER',
        },
    });

    const onSubmit = useCallback(async (data: RegisterData) => {
        console.log('register data', data);
        try {
            await register(data);
            Alert.alert(
                'Success',
                'Your account has been created. Please log in.',
                [{ text: 'OK', onPress: () => router.push('/(auth)/login') }]
            );
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            Alert.alert('Registration Failed', message);
        }
    }, [register, router]);

    const handleLoginPress = useCallback(() => {
        router.push('/(auth)/login');
    }, [router]);

    return (
        <RegisterPresentation
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            errors={errors}
            onLoginPress={handleLoginPress}
        />
    );
};
