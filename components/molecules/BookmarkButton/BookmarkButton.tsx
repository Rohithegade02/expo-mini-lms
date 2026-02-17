import React, { memo, useCallback, useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { Icon } from '../../atoms/Icon/Icon';
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
            className={`p-2 ${className}`}
            activeOpacity={0.7}
            {...props}
        >
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Icon
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    size={size}
                    color={isBookmarked ? '#3b82f6' : '#6b7280'}
                    library="ionicons"
                />
            </Animated.View>
        </Pressable>
    );
});
