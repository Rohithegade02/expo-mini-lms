import { Icon } from '@/components/atoms';
import { theme } from '@/constants/theme';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { HeaderBarProps } from '../types';


// This component is responsible for rendering the header bar of the course details.
export const HeaderBar = memo(({
    isDark,
    isBookmarked,
    onBack,
    onShare,
    onToggleBookmark,
    testID,
    accessibilityLabel,
}: HeaderBarProps) => (
    <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900" testID={testID} accessibilityLabel={accessibilityLabel}>
        <Pressable onPress={onBack}>
            <Icon name="chevron-back" size={24} color={isDark ? theme.dark.colors.white : theme.light.colors.gray[800]} />
        </Pressable>

        <View className="flex-row items-center">
            <Pressable onPress={onShare} className="mr-5">
                <Icon name="share-outline" size={22} color={isDark ? theme.dark.colors.white : theme.light.colors.gray[800]} />
            </Pressable>

            <Pressable onPress={onToggleBookmark}>
                <Icon
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    size={22}
                    color={isBookmarked ? theme.light.colors.primary[600] : (isDark ? theme.dark.colors.white : theme.light.colors.gray[800])}
                />
            </Pressable>
        </View>
    </View>
));

HeaderBar.displayName = 'HeaderBar';
