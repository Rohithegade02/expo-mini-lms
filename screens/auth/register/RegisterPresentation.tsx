import { Button, Input, Text } from '@/components/atoms';
import { LegendList } from '@legendapp/list';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { FIELD_CONFIG } from './config';
import { RegisterPresentationProps } from './types';




export const RegisterPresentation: React.FC<RegisterPresentationProps> = memo(({
    control,
    errors,
    onSubmit,
    isLoading,
    onLoginPress,
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
                    keyboardType={item.keyboardType}
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
                ListFooterComponent={() => <ListFooter onSubmit={onSubmit} isLoading={isLoading} onLoginPress={onLoginPress} />}
                showsVerticalScrollIndicator={false}
                recycleItems
            />
        </KeyboardAvoidingView>
    );
});


const ListHeader = memo(() => (
    <View className="flex gap-3 mb-3">
        <Text variant="h1" className="text-gray-900 mb-2">Create Account</Text>
        <Text variant="body" className="text-gray-500">Join our community and start learning today</Text>
    </View>
));

const ListFooter = memo((
    {
        onSubmit,
        isLoading,
        onLoginPress,
    }: RegisterPresentationProps
) => (
    <View className="mt-6 pb-10">
        <Button
            label="Register"
            onPress={onSubmit}
            isLoading={isLoading}
        />
        <View className="flex-row justify-center mt-2">
            <Text className="text-gray-500">Already have an account? </Text>
            <Pressable onPress={onLoginPress}>
                <Text className="text-blue-600 font-semibold">Log In</Text>
            </Pressable>
        </View>
    </View>
));