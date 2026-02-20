import { Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import React, { memo } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { CourseListHeaderProps } from '../types';


export const CourseListHeader = memo(({ searchQuery, onSearch, isSmartSearchLoading, onSmartSearch, testID, accessibilityLabel }: CourseListHeaderProps) => (
    <View className="pt-6 pb-4" testID={testID} accessibilityLabel={accessibilityLabel}>
        <Text variant="h2" className="text-gray-900 dark:text-white mb-2">Explore Courses</Text>
        <Text variant="body" className="text-gray-500 dark:text-gray-400 mb-2">Master new skills with our expert-led courses</Text>

        <View className="flex-row items-center bg-white px-4  rounded-2xl border border-gray-200">
            <Icon name="search-outline" size={20} color={theme.light.colors.gray[500]} className="mr-2" />
            <TextInput
                placeholder="Search courses..."
                value={searchQuery}
                onChangeText={onSearch}
                className="flex-1 text-gray-900 dark:text-white mb-[2px] text-base"
                placeholderTextColor={theme.light.colors.gray[400]}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {searchQuery !== '' && (
                <Pressable onPress={() => onSearch('')} className="mr-2">
                    <Icon name="close-circle" size={20} color={theme.light.colors.gray[400]} />
                </Pressable>
            )}

            <Pressable
                onPress={() => onSmartSearch?.(searchQuery)}
                disabled={isSmartSearchLoading || searchQuery.trim() === ''}
                className={`ml-1 px-3 py-1.5 rounded-xl flex-row items-center ${isSmartSearchLoading ? 'bg-gray-100' : (searchQuery.trim() !== '' ? 'bg-primary-50 dark:bg-primary-900/30' : 'bg-transparent')}`}
            >
                <Icon name="sparkles" size={16} color={isSmartSearchLoading || searchQuery.trim() === '' ? theme.light.colors.gray[400] : theme.light.colors.primary[600]} />
                <Text className={`ml-1 text-xs font-medium ${isSmartSearchLoading || searchQuery.trim() === '' ? 'text-gray-400' : 'text-primary-600 dark:text-primary-400'}`}>
                    AI
                </Text>
            </Pressable>
        </View>
    </View>
));

CourseListHeader.displayName = 'CourseListHeader';
