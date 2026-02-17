import clsx from 'clsx';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
    ActivityIndicator,
    GestureResponderEvent,
    Pressable,
    View
} from 'react-native';
import { Text } from '../Text/Text';
import { ButtonProps, ButtonSize, ButtonVariant } from './types';

const variantStyles = new Map<ButtonVariant, string>([
    ['primary', 'bg-blue-600'],
    ['secondary', 'bg-gray-800'],
    ['outline', 'bg-transparent border border-blue-600'],
    ['ghost', 'bg-transparent'],
    ['danger', 'bg-red-600'],
]);

const textStyles = new Map<ButtonVariant, string>([
    ['primary', 'text-white'],
    ['secondary', 'text-white'],
    ['outline', 'text-blue-600'],
    ['ghost', 'text-blue-600'],
    ['danger', 'text-white'],
]);

const sizeStyles = new Map<ButtonSize, string>([
    ['sm', 'px-3 py-2'],
    ['md', 'px-4 py-3'],
    ['lg', 'px-6 py-4'],
]);

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
    const handlePress = (e: GestureResponderEvent) => {
        if (isLoading || disabled) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
    };

    const containerClass = `flex-row items-center justify-center rounded-xl ${variantStyles.get(variant)
        } ${sizeStyles.get(size)} ${disabled || isLoading ? 'opacity-50' : ''} ${className}`;

    return (
        <Pressable
            className={clsx(
                'flex-row items-center justify-center rounded-xl',
                variantStyles.get(variant),
                sizeStyles.get(size),
                {
                    'opacity-50': disabled || isLoading,
                },
                className
            )}
            onPress={handlePress}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#2563eb' : '#fff'} />
            ) : (
                <>
                    {leftIcon && <View className="mr-2">{leftIcon}</View>}
                    <Text
                        className={clsx('font-semibold text-center', textStyles.get(variant))}
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
