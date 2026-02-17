import * as Haptics from 'expo-haptics';
import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    View
} from 'react-native';
import { Text } from '../Text/Text';
import { ButtonProps, ButtonSize, ButtonVariant } from './types';

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-800',
    outline: 'bg-transparent border border-blue-600',
    ghost: 'bg-transparent',
    danger: 'bg-red-600',
};

const textStyles: Record<ButtonVariant, string> = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-blue-600',
    ghost: 'text-blue-600',
    danger: 'text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
};

export const Button: React.FC<ButtonProps> = ({
    label,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    onPress,
    ...props
}) => {
    const handlePress = (e: any) => {
        if (isLoading || disabled) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
    };

    const containerClass = `flex-row items-center justify-center rounded-xl ${variantStyles[variant]
        } ${sizeStyles[size]} ${disabled || isLoading ? 'opacity-50' : ''} ${className}`;

    return (
        <Pressable
            className={containerClass}
            onPress={handlePress}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#2563eb' : '#fff'} />
            ) : (
                <>
                    {leftIcon && <View className="mr-2">{leftIcon}</View>}
                    <Text
                        className={`font-semibold text-center ${textStyles[variant]}`}
                        style={{ fontSize: size === 'sm' ? 14 : size === 'lg' ? 18 : 16 }}
                    >
                        {label}
                    </Text>
                    {rightIcon && <View className="ml-2">{rightIcon}</View>}
                </>
            )}
        </Pressable>
    );
};
