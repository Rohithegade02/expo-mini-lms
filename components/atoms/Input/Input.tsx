import { theme } from '@/constants/theme';
import clsx from 'clsx';
import React, { useState } from 'react';
import {
    Pressable,
    TextInput,
    View
} from 'react-native';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { InputProps } from './types';
export const Input: React.FC<InputProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    isPassword,
    className = '',
    secureTextEntry,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const isSecure = isPassword && !showPassword;

    return (
        <View className={clsx('mb-4', className)}>
            {label && (
                <Text variant="label" className="mb-1 text-gray-700">
                    {label}
                </Text>
            )}
            <View
                className={clsx('flex-row items-center bg-gray-50 border rounded-xl px-3', {
                    'border-primary-500 bg-white': isFocused,
                    'border-error-500': error,
                    'border-gray-200': !isFocused && !error,
                })}
            >
                {leftIcon && (
                    <Icon name={leftIcon} size={20} color={theme.light.colors.gray[400]} className="mr-2" />
                )}
                <TextInput
                    className="flex-1  text-gray-900 py-2.5"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={isSecure}
                    placeholderTextColor={theme.light.colors.gray[400]}
                    {...props}
                />
                {isPassword ? (
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color={theme.light.colors.gray[400]}
                            library="ionicons"
                        />
                    </Pressable>
                ) : rightIcon ? (
                    <Icon name={rightIcon} size={20} color={theme.light.colors.gray[400]} library="ionicons" />
                ) : null}
            </View>
            {error && (
                <Text variant="caption" className="mt-1 text-error-500">
                    {error}
                </Text>
            )}
        </View>
    );
};
