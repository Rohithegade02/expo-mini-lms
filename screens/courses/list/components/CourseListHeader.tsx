import { Icon, Text } from '@/components/atoms';
import React, { memo } from 'react';
import { Pressable, TextInput, View } from 'react-native';

interface CourseListHeaderProps {
    searchQuery: string;
    onSearch: (query: string) => void;
}

export const CourseListHeader = memo(({ searchQuery, onSearch }: CourseListHeaderProps) => (
    <View className="pt-6 pb-4">
        <Text variant="h2" className="text-gray-900 mb-2">Explore Courses</Text>
        <Text variant="body" className="text-gray-500 mb-2">Master new skills with our expert-led courses</Text>

        <View className="flex-row items-center bg-white px-4 py-2.5 rounded-2xl border border-gray-200">
            <Icon name="search-outline" size={20} color="#6b7280" className="mr-2" />
            <TextInput
                placeholder="Search courses..."
                value={searchQuery}
                onChangeText={onSearch}
                className="flex-1 text-gray-900 mb-[2px] text-base"
                placeholderTextColor="#9ca3af"
                autoCapitalize="none"
                autoCorrect={false}
            />
            {searchQuery !== '' && (
                <Pressable onPress={() => onSearch('')}>
                    <Icon name="close-circle" size={20} color="#9ca3af" />
                </Pressable>
            )}
        </View>
    </View>
));

CourseListHeader.displayName = 'CourseListHeader';
