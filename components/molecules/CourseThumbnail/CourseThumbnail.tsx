import { Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { CourseThumbnailProps } from './types';

export const CourseThumbnail: React.FC<CourseThumbnailProps> = memo(
    ({ thumbnail, category, isBookmarked, onToggleBookmark }) => {
        return (
            <View>
                <Image
                    source={{ uri: thumbnail }}
                    className="w-full h-48"
                    contentFit="cover"
                    transition={200}
                />
                <View className="flex-row items-center justify-between px-4 py-2 bg-gray-50">
                    <View className="bg-primary-100 px-3 py-1 rounded-full">
                        <Text variant="caption" className="text-primary-700 font-semibold uppercase">
                            {category}
                        </Text>
                    </View>
                    <Pressable onPress={onToggleBookmark} className="p-1">
                        <Icon
                            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                            size={20}
                            color={isBookmarked ? theme.light.colors.primary[600] : theme.light.colors.gray[500]}
                        />
                    </Pressable>
                </View>
            </View>
        );
    }
);

CourseThumbnail.displayName = 'CourseThumbnail';
