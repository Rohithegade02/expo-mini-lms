import { Icon, Text } from '@/components/atoms';
import { CourseCard } from '@/components/organisms/CourseCard/CourseCard';
import { theme } from '@/constants/theme';
import { Course } from '@/types/course';
import { LegendList } from '@legendapp/list';
import clsx from 'clsx';
import React, { memo, useCallback } from 'react';
import { RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CourseListError from './components/CourseListError';
import { CourseListHeader } from './components/CourseListHeader';
import CourseListLoader from './components/CourseListLoader';
import { CourseListPresentationProps } from './types';

// This component is responsible for rendering the course list.
export const CourseListPresentation: React.FC<CourseListPresentationProps> = memo(({
    courses,
    isLoading,
    error,
    searchQuery,
    onSearch,
    isSmartSearchLoading,
    onSmartSearch,
    onRefresh,
    onCoursePress,
    onToggleBookmark,
    testID = "course-list-screen",
    accessibilityLabel = "course-list-screen",
    orientation
}) => {
    const { top } = useSafeAreaInsets();

    const renderItem = useCallback(({ item }: { item: Course }) => (
        <CourseCard
            course={item}
            onPress={onCoursePress}
            onToggleBookmark={onToggleBookmark}
            testID={`${testID}-card-${item.id}`}
            accessibilityLabel={`${testID}-card-${item.id}`}
        />
    ), [onCoursePress, onToggleBookmark, testID]);



    if (error && courses.length === 0) {
        return (
            <CourseListError error={error} onRefresh={onRefresh} testID={testID} accessibilityLabel={accessibilityLabel} />
        );
    }
    const isInitialLoading = isLoading && courses.length === 0 && !searchQuery.trim();

    if (isInitialLoading) {
        return (
            <CourseListLoader orientation={orientation} searchQuery={searchQuery} onSearch={onSearch} isSmartSearchLoading={isSmartSearchLoading} onSmartSearch={onSmartSearch} testID={testID} accessibilityLabel={accessibilityLabel} />
        );
    }

    return (
        <View
            className={clsx('flex-1 bg-white dark:bg-gray-900', orientation === 'landscape' ? 'px-16' : 'px-4')}
            style={{ paddingTop: top }}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
        >
            <CourseListHeader
                searchQuery={searchQuery}
                onSearch={onSearch}
                isSmartSearchLoading={isSmartSearchLoading}
                onSmartSearch={onSmartSearch}
                testID={`${testID}-header`}
                accessibilityLabel={`${testID}-header`}
            />
            <LegendList
                data={courses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={orientation === 'landscape' ? 2 : 1}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: orientation === 'landscape' ? 16 : 0, paddingTop: 0, gap: orientation === 'landscape' ? 16 : 0 }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} tintColor={theme.light.colors.primary[600]} />
                }
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center px-10 py-20">
                        <Icon name="search-outline" size={64} color={theme.light.colors.gray[300]} className="mb-4" />
                        <Text variant="h3" className="text-gray-900 mb-2 text-center">No courses found</Text>
                        <Text variant="body" className="text-gray-500 text-center">
                            Try adjusting your search to find what you're looking for.
                        </Text>
                    </View>
                }
                recycleItems
                testID={`${testID}-list`}
                accessibilityLabel={`${testID}-list`}
            />
        </View>
    );
});
