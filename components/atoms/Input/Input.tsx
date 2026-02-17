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
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isSecure = isPassword && !showPassword;

    return (
        <View className={`mb-4 ${className}`}>
            {label && (
                <Text variant="label" className="mb-1 text-gray-700">
                    {label}
                </Text>
            )}
            <View
                className={`flex-row items-center bg-gray-50 border rounded-xl px-3 ${isFocused ? 'border-blue-500 bg-white' : error ? 'border-red-500' : 'border-gray-200'
                    }`}
            >
                {leftIcon && (
                    <Icon name={leftIcon} size={20} color="#9ca3af" className="mr-2" />
                )}
                <TextInput
                    className="flex-1  text-gray-900 py-2.5"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={isSecure}
                    placeholderTextColor="#9ca3af"
                    {...props}
                />
                {isPassword ? (
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color="#9ca3af"
                            library="ionicons"
                        />
                    </Pressable>
                ) : rightIcon ? (
                    <Icon name={rightIcon} size={20} color="#9ca3af" library="ionicons" />
                ) : null}
            </View>
            {error && (
                <Text variant="caption" className="mt-1 text-red-500">
                    {error}
                </Text>
            )}
        </View>
    );
};
