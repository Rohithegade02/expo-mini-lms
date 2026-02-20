import { Input } from '@/components/atoms';
import { LegendList } from '@legendapp/list';
import clsx from 'clsx';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import { LoginFooter } from './components/LoginFooter';
import { LoginHeader } from './components/LoginHeader';
import { FIELD_CONFIG } from './config';
import { LoginPresentationProps } from './types';

const AnimatedKeyboardAvoidingView = Animated.createAnimatedComponent(KeyboardAvoidingView);

export const LoginPresentation: React.FC<LoginPresentationProps> = memo(({
    control,
    errors,
    onSubmit,
    isLoading,
    onRegisterPress,
    testID = "login-screen",
    accessibilityLabel = "login-screen",
    orientation
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
                    testID={`${testID}-${item.name}`}
                    accessibilityLabel={`${testID}-${item.name}`}
                />
            )}
        />
    );



    return (
        <AnimatedKeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className={clsx("flex-1 bg-gray-100 dark:bg-gray-800", orientation === 'landscape' && "px-16")}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
        >
            <LegendList
                data={FIELD_CONFIG}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ paddingHorizontal: 16, flex: 1, justifyContent: 'center' }}
                ListHeaderComponent={LoginHeader}
                ListHeaderComponentStyle={{ marginBottom: 16 }}
                ListFooterComponent={() => <LoginFooter onSubmit={onSubmit} isLoading={isLoading} onRegisterPress={onRegisterPress} />}
                showsVerticalScrollIndicator={false}
                recycleItems
                testID={`${testID}-list`}
                accessibilityLabel={`${testID}-list`}
            />
        </AnimatedKeyboardAvoidingView>
    );
});



