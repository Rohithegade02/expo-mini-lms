import { Icon } from '@/components/atoms';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';

interface HeaderBarProps {
    isBookmarked: boolean;
    onBack: () => void;
    onShare: () => void;
    onToggleBookmark: () => void;
}

export const HeaderBar = memo(({
    isBookmarked,
    onBack,
    onShare,
    onToggleBookmark,
}: HeaderBarProps) => (
    <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
        <Pressable onPress={onBack}>
            <Icon name="chevron-back" size={24} color="#1f2937" />
        </Pressable>

        <View className="flex-row items-center">
            <Pressable onPress={onShare} className="mr-5">
                <Icon name="share-outline" size={22} color="#1f2937" />
            </Pressable>

            <Pressable onPress={onToggleBookmark}>
                <Icon
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    size={22}
                    color={isBookmarked ? '#2563eb' : '#1f2937'}
                />
            </Pressable>
        </View>
    </View>
));

HeaderBar.displayName = 'HeaderBar';
