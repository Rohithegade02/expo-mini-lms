import { Avatar, Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { View } from 'react-native';
import { CourseHeaderProps } from '../types';


export const CourseHeader = memo(({ isDark, course, testID, accessibilityLabel }: CourseHeaderProps) => {
    return (
        <View testID={testID} accessibilityLabel={accessibilityLabel}>
            <Image
                source={{ uri: course.thumbnail }}
                className="w-full h-56"
                contentFit="cover"
                transition={200}
            />

            <View className="px-6 pt-6 pb-4">

                {/* Category + Rating */}
                <View className="flex-row items-center justify-between mb-3">
                    <View className="bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                        <Text className="text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-wide">
                            {course.category}
                        </Text>
                    </View>

                    <View className="flex-row items-center">
                        <Icon name="star" size={16} color={theme.light.colors.warning[500]} />
                        <Text className="ml-1 text-gray-800 dark:text-gray-200 font-semibold">
                            {course.rating.toFixed(1)}
                        </Text>
                    </View>
                </View>

                {/* Title */}
                <Text variant="h1" className="text-gray-900 dark:text-white leading-tight mb-4">
                    {course.title}
                </Text>

                {/* Instructor */}
                <View className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl flex-row items-center mb-6">
                    <Avatar
                        source={course.instructor.avatar}
                        size="md"
                        name={course.instructor.name.first}
                    />
                    <View className="ml-3">
                        <Text className="text-gray-400 dark:text-gray-500 text-[10px] font-semibold uppercase">
                            Instructor
                        </Text>
                        <Text className="text-gray-900 dark:text-white font-semibold">
                            {course.instructor.name.first} {course.instructor.name.last}
                        </Text>
                    </View>
                </View>

                {/* Description */}
                <Text className="text-gray-900 dark:text-white font-semibold text-lg mb-2">
                    About this course
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm leading-5 mb-6">
                    {course.description}
                </Text>

                <Text className="text-gray-900 dark:text-white font-semibold text-lg">
                    What you'll get
                </Text>
            </View>
        </View>
    );
});

CourseHeader.displayName = 'CourseHeader';
