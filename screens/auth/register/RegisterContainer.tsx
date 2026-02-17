import { ROUTES } from '@/constants/router';
import { useAuth } from '@/hooks/use-auth';
import { registerSchema } from '@/schema';
import { RegisterData } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { RegisterPresentation } from './RegisterPresentation';

export const RegisterContainer: React.FC = () => {
    const router = useRouter();
    const { register: registerAction, isLoading } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
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
        try {
            await registerAction(data);
            // empty the form
            reset();
            Alert.alert(
                'Success',
                'Your account has been created. Please log in.',
                [{ text: 'OK', onPress: () => router.push(ROUTES.auth.login) }]
            );
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            Alert.alert('Registration Failed', message);
        }
    }, [registerAction, router, reset]);

    const handleLoginPress = useCallback(() => {
        router.push(ROUTES.auth.login);
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
