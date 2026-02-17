import { Avatar, Button, Icon, Text } from '@/components/atoms';
import { LegendList } from '@legendapp/list';
import { Image } from 'expo-image';
import React, { memo, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CourseDetailsPresentationProps } from './types';

export const CourseDetailsPresentation: React.FC<CourseDetailsPresentationProps> = memo(({
    course,
    isEnrolled,
    isBookmarked,
    isLoading,
    onEnroll,
    onToggleBookmark,
    onBack,
    onShare,
    onViewContent,
}) => {

    console.log(course);

    const features = useMemo(() => ([
        { id: '1', icon: 'play-circle-outline', label: '12 Lessons' },
        { id: '2', icon: 'time-outline', label: '4.5 Hours' },
        { id: '3', icon: 'bar-chart-outline', label: 'All Levels' },
        { id: '4', icon: 'shield-checkmark-outline', label: 'Certificate' },
    ]), []);

    return (
        <SafeAreaView className="flex-1 bg-white">

            {/* Top Navigation */}
            <HeaderBar
                isBookmarked={isBookmarked}
                onBack={onBack}
                onShare={onShare}
                onToggleBookmark={onToggleBookmark}
            />

            <LegendList
                data={features}
                keyExtractor={(item) => item.id}
                estimatedItemSize={60}
                renderItem={({ item }) => (
                    <FeatureItem icon={item.icon} label={item.label} />
                )}
                ListHeaderComponent={
                    <CourseHeader
                        course={course}
                    />
                }
                ListFooterComponent={
                    <CourseFooter
                        price={course.price}
                        isEnrolled={isEnrolled}
                        isLoading={isLoading}
                        onEnroll={onEnroll}
                        onViewContent={onViewContent}
                    />
                }
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </SafeAreaView>
    );
});

CourseDetailsPresentation.displayName = 'CourseDetailsPresentation';


const HeaderBar = memo(({
    isBookmarked,
    onBack,
    onShare,
    onToggleBookmark,
}: any) => (
    <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
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




const CourseHeader = memo(({ course }: any) => {
    return (
        <View>
            <Image
                source={{ uri: course.thumbnail }}
                className="w-full h-56"
                contentFit="cover"
                transition={200}
            />

            <View className="px-6 pt-6 pb-4">

                {/* Category + Rating */}
                <View className="flex-row items-center justify-between mb-3">
                    <View className="bg-blue-50 px-3 py-1 rounded-full">
                        <Text className="text-blue-600 text-xs font-semibold uppercase tracking-wide">
                            {course.category}
                        </Text>
                    </View>

                    <View className="flex-row items-center">
                        <Icon name="star" size={16} color="#f59e0b" />
                        <Text className="ml-1 text-gray-800 font-semibold">
                            {course.rating.toFixed(1)}
                        </Text>
                    </View>
                </View>

                {/* Title */}
                <Text variant="h1" className="text-gray-900 leading-tight mb-4">
                    {course.title}
                </Text>

                {/* Instructor */}
                <View className="bg-gray-100 px-4 py-3 rounded-xl flex-row items-center mb-6">
                    <Avatar
                        source={course.instructor.avatar}
                        size="md"
                        name={course.instructor.name.first}
                    />
                    <View className="ml-3">
                        <Text className="text-gray-400 text-[10px] font-semibold uppercase">
                            Instructor
                        </Text>
                        <Text className="text-gray-900 font-semibold">
                            {course.instructor.name.first} {course.instructor.name.last}
                        </Text>
                    </View>
                </View>

                {/* Description */}
                <Text className="text-gray-900 font-semibold text-lg mb-2">
                    About this course
                </Text>
                <Text className="text-gray-600 text-sm leading-5 mb-6">
                    {course.description}
                </Text>

                <Text className="text-gray-900 font-semibold text-lg mb-4">
                    What you'll get
                </Text>
            </View>
        </View>
    );
});




const FeatureItem = memo(({ icon, label }: { icon: string; label: string }) => (
    <View className="flex-row items-center bg-black px-6 py-3">
        <View className="bg-blue-50 p-2 rounded-lg mr-3">
            <Icon name={icon} size={18} color="#2563eb" />
        </View>
        <Text className="text-gray-700 font-medium text-sm">
            {label}
        </Text>
    </View>
));





const CourseFooter = memo(({
    price,
    isEnrolled,
    isLoading,
    onEnroll,
    onViewContent,
}: any) => (
    <View className="px-6 pt-6 pb-10 border-t border-gray-200 mt-6">

        <View className="mb-4">
            <Text className="text-gray-400 text-xs font-semibold uppercase mb-1">
                Price
            </Text>

            <Text className="text-3xl font-bold text-blue-600">
                ${price.toFixed(2)}
            </Text>
        </View>

        <Button
            label={isEnrolled ? 'View Content' : 'Enroll Now'}
            onPress={isEnrolled ? onViewContent : onEnroll}
            isLoading={isLoading}
            className="rounded-xl"
            variant="primary"
        />
    </View>
));


