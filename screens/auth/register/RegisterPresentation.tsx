import { Input } from '@/components/atoms';
import { LegendList } from '@legendapp/list';
import clsx from 'clsx';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { RegisterFooter } from './components/RegisterFooter';
import { RegisterHeader } from './components/RegisterHeader';
import { FIELD_CONFIG } from './config';
import { RegisterPresentationProps } from './types';




export const RegisterPresentation: React.FC<RegisterPresentationProps> = memo(({
    control,
    onSubmit,
    isLoading,
    onLoginPress,
    testID = "register-screen",
    accessibilityLabel = "register-screen",
    orientation
}) => {
    const renderItem = ({ item }: { item: typeof FIELD_CONFIG[0] }) => (
        <Controller
            control={control}
            name={item.name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                    label={item.label}
                    placeholder={item.placeholder}
                    leftIcon={item.leftIcon}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={error?.message}
                    autoCapitalize={item.autoCapitalize}
                    keyboardType={item.keyboardType}
                    isPassword={item.isPassword}
                    testID={`${testID}-${item.name}`}
                    accessibilityLabel={`${testID}-${item.name}`}
                />
            )}
        />
    );



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className={clsx("flex-1 bg-gray-100 dark:bg-gray-800", orientation === 'landscape' && "px-16")}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
        >
            <LegendList
                data={FIELD_CONFIG}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, flex: 1, justifyContent: 'center' }}
                style={{ flex: 1, paddingTop: orientation === 'landscape' ? 60 : 0, paddingHorizontal: orientation === 'landscape' ? 16 : 0 }}
                ListHeaderComponent={RegisterHeader}
                ListHeaderComponentStyle={{ marginBottom: 16 }}
                ListFooterComponent={() => <RegisterFooter onSubmit={onSubmit} isLoading={isLoading} onLoginPress={onLoginPress} />}
                showsVerticalScrollIndicator={false}
                recycleItems
                testID={`${testID}-list`}
                accessibilityLabel={`${testID}-list`}
            />
        </KeyboardAvoidingView>
    );
});




