import { Icon } from '@/components/atoms/Icon/Icon';
import React, { memo, useCallback, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
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
                // useNativeDriver: true, // TouchableOpacity animations are not native draggable? wait, Animated.value is fine.
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
        <TouchableOpacity
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
        </TouchableOpacity>
    );
});
