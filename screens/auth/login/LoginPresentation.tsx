import { Button, Input, Text } from '@/components/atoms';
import { LegendList } from '@legendapp/list';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import { FIELD_CONFIG } from './config';
import { LoginPresentationProps } from './types';

export const LoginPresentation: React.FC<LoginPresentationProps> = memo(({
    control,
    errors,
    onSubmit,
    isLoading,
    onRegisterPress,
}) => {
    const renderItem = ({ item }: { item: typeof FIELD_CONFIG[0] }) => (
        <Controller
            control={control}
            name={item.name}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                    label={item.label}
                    placeholder={item.placeholder}
                    leftIcon={item.leftIcon}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors?.[item.name]?.message}
                    autoCapitalize={item.autoCapitalize}
                    isPassword={item.isPassword}
                    className="mb-4"
                />
            )}
        />
    );



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        >
            <LegendList
                data={FIELD_CONFIG}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ paddingHorizontal: 24, flex: 1, justifyContent: 'center' }}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={() => <ListFooter onSubmit={onSubmit} isLoading={isLoading} onRegisterPress={onRegisterPress} />}
                showsVerticalScrollIndicator={false}
            />
        </KeyboardAvoidingView>
    );
});


const ListHeader = memo(() => (
    <View className="mb-10 mt-10">
        <Text variant="h1" className="text-gray-900 mb-2">Welcome Back</Text>
        <Text variant="body" className="text-gray-500">Log in to continue your learning journey</Text>
    </View>
));

const ListFooter = memo((
    {
        onSubmit,
        isLoading,
        onRegisterPress,
    }: LoginPresentationProps
) => (
    <View className="mt-6 pb-10">
        <Button
            label="Log In"
            onPress={onSubmit}
            isLoading={isLoading}
        />
        <View className="flex-row justify-center mt-8">
            <Text className="text-gray-500">Don't have an account? </Text>
            <TouchableOpacity onPress={onRegisterPress}>
                <Text className="text-blue-600 font-semibold">Register</Text>
            </TouchableOpacity>
        </View>
    </View>
));