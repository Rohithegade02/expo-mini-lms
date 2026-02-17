import { Icon, Skeleton, Text } from '@/components/atoms';
import { CourseCard } from '@/components/organisms/CourseCard/CourseCard';
import { LegendList } from '@legendapp/list';
import React, { memo, useCallback } from 'react';
import { Pressable, RefreshControl, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CourseListHeader } from './components/CourseListHeader';
import { CourseListPresentationProps } from './types';

export const CourseListPresentation: React.FC<CourseListPresentationProps> = memo(({
    courses,
    isLoading,
    error,
    searchQuery,
    onSearch,
    onRefresh,
    onCoursePress,
    onToggleBookmark,
}) => {
    const { top } = useSafeAreaInsets();
    const renderItem = useCallback(({ item }: { item: any }) => (
        <CourseCard
            course={item}
            onPress={onCoursePress}
            onToggleBookmark={onToggleBookmark}
        />
    ), [onCoursePress, onToggleBookmark]);

    if (error && courses.length === 0) {
        return (
            <SafeAreaView className="flex-1 bg-white justify-center items-center px-10">
                <Icon name="alert-circle-outline" size={64} color="#ef4444" className="mb-4" />
                <Text variant="h2" className="text-gray-900 mb-2 text-center">Something went wrong</Text>
                <Text variant="body" className="text-gray-500 text-center mb-8">{error}</Text>
                <Pressable
                    onPress={onRefresh}
                    className="bg-blue-600 px-8 py-3 rounded-xl"
                >
                    <Text className="text-white font-bold">Try Again</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    if (isLoading && courses.length === 0) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <CourseListHeader searchQuery={searchQuery} onSearch={onSearch} />
                <View className="px-6">
                    {[1, 2, 3].map((i) => (
                        <View key={i} className="mb-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
                            <Skeleton height={192} />
                            <View className="p-4">
                                <View className="flex-row items-center mb-2">
                                    <Skeleton width={24} height={24} borderRadius={12} />
                                    <Skeleton width={120} height={16} className="ml-2" />
                                </View>
                                <Skeleton width="90%" height={24} className="mb-2" />
                                <Skeleton width="60%" height={16} />
                            </View>
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View className='flex-1' style={{ paddingTop: top }}>
            <LegendList
                data={courses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <CourseListHeader
                        searchQuery={searchQuery}
                        onSearch={onSearch}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
                ListHeaderComponentStyle={{ marginBottom: 16 }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} tintColor="#2563eb" />
                }
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center px-10 py-20">
                        <Icon name="search-outline" size={64} color="#d1d5db" className="mb-4" />
                        <Text variant="h3" className="text-gray-900 mb-2 text-center">No courses found</Text>
                        <Text variant="body" className="text-gray-500 text-center">
                            Try adjusting your search to find what you're looking for.
                        </Text>
                    </View>
                }
                recycleItems
            />
        </View>
    );
});
