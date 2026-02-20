import { Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { CourseThumbnailProps } from './types';

export const CourseThumbnail: React.FC<CourseThumbnailProps> = memo(
    ({ thumbnail, category, isBookmarked, onToggleBookmark, testID, accessibilityLabel }) => {
        return (


            <View testID={testID} accessibilityLabel={accessibilityLabel} className="flex-row items-center justify-between px-4 py-2 dark:bg-gray-800 bg-gray-50">
                <View className="bg-primary-100 dark:bg-primary-700 px-3 py-1 rounded-full">
                    <Text variant="caption" className="text-primary-700 dark:text-primary-200 font-semibold uppercase">
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

        );
    }
);

CourseThumbnail.displayName = 'CourseThumbnail';
