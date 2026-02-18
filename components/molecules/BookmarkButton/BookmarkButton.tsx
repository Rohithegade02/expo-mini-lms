import { Icon } from '@/components/atoms/Icon/Icon';
import { theme } from '@/constants/theme';
import clsx from 'clsx';
import React, { memo, useCallback, useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { BookmarkButtonProps } from './types';

export const BookmarkButton: React.FC<BookmarkButtonProps> = memo(({
    isBookmarked,
    onToggle,
    size = 24,
    className = '',
    ...props
}) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePress = useCallback(() => {
        // Animate scale
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        onToggle();
    }, [scaleValue, onToggle]);

    return (
        <Pressable
            onPress={handlePress}
            className={clsx('p-2', className)}
            {...props}
        >
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Icon
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    size={size}
                    color={isBookmarked ? theme.light.colors.primary[500] : theme.light.colors.gray[500]}
                    library="ionicons"
                />
            </Animated.View>
        </Pressable>
    );
});
