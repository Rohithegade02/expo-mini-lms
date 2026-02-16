import { Image } from 'expo-image';
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '../Text/Text';
import { AvatarProps } from './types';


export const Avatar: React.FC<AvatarProps> = memo(({
    source,
    name,
    size = 40,
    className = '',
    ...props
}) => {
    const getInitials = useMemo(() => (fullName?: string): string => {
        if (!fullName) return '?';
        const names = fullName.split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return fullName[0].toUpperCase();
    }, [name]);

    const initials = getInitials(name);

    return (
        <View
            className={`rounded-full overflow-hidden items-center justify-center bg-gray-300 ${className}`}
            style={{ width: size, height: size }}
            {...props}
        >
            {source ? (
                <Image
                    source={{ uri: source }}
                    style={{ width: size, height: size }}
                    contentFit="cover"
                    transition={200}
                />
            ) : (
                <Text variant="label" className="text-gray-700">
                    {initials}
                </Text>
            )}
        </View>
    );
});
