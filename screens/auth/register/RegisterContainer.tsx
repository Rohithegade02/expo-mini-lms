import { ROUTES } from '@/constants/router';
import { useAuth } from '@/hooks/use-auth';
import useOrientation from '@/hooks/use-orientation';
import { RegisterData, registerSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { RegisterPresentation } from './RegisterPresentation';

// This is the container component for the register screen
export const RegisterContainer: React.FC = () => {
    const router = useRouter();
    const { register: registerAction, isLoading } = useAuth();
    const orientation = useOrientation();

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
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
            orientation={orientation}
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            onLoginPress={handleLoginPress}
        />
    );
};
