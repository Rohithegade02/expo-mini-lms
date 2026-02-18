import { Button, Input, Text } from '@/components/atoms';
import { LegendList } from '@legendapp/list';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
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
                contentContainerStyle={{ paddingHorizontal: 16, flex: 1, justifyContent: 'center' }}
                ListHeaderComponent={ListHeader}
                ListHeaderComponentStyle={{ marginBottom: 16 }}
                ListFooterComponent={() => <ListFooter onSubmit={onSubmit} isLoading={isLoading} onRegisterPress={onRegisterPress} />}
                showsVerticalScrollIndicator={false}
                recycleItems
            />
        </KeyboardAvoidingView>
    );
});


const ListHeader = memo(() => (
    <View className="flex gap-2.5">
        <Text variant="h1" className="text-gray-900">Welcome Back</Text>
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
        <View className="flex-row justify-center mt-2">
            <Text className="text-gray-500">Don't have an account? </Text>
            <Pressable onPress={onRegisterPress}>
                <Text className="text-primary-600 font-semibold">Register</Text>
            </Pressable>
        </View>
    </View>
));