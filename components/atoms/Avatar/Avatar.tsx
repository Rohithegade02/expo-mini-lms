import { AvatarProps } from '@/components/atoms/Avatar/types';
import { Text } from '@/components/atoms/Text/Text';
import clsx from 'clsx';
import { Image } from 'expo-image';
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';


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

    const sizeValue = useMemo<number>(() => {
        if (typeof size === 'number') return size;
        if (!size) return 40;
        const sizeMap = new Map<string, number>([
            ['sm', 32],
            ['md', 48],
            ['lg', 64],
            ['xl', 80],
        ]);
        return sizeMap.get(size) || 40;
    }, [size]);

    const initials = getInitials(name);

    return (
        <View
            className={clsx('rounded-full overflow-hidden items-center justify-center bg-gray-300 dark:bg-gray-700', className)}
            style={{ width: sizeValue, height: sizeValue }}
            {...props}
        >
            {source ? (
                <Image
                    source={{ uri: source }}
                    style={{ width: sizeValue, height: sizeValue }}
                    contentFit="cover"
                    transition={200}
                />
            ) : (
                <Text variant="label" className="text-gray-700 dark:text-gray-300">
                    {initials}
                </Text>
            )}
        </View>
    );
});
