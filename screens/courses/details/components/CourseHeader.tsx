import { Avatar, Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { View } from 'react-native';
import { CourseHeaderProps } from '../types';

const Thumbnail = memo(({ uri }: { uri: string }) => (
    <Image
        source={{ uri }}
        className="w-full h-56"
        contentFit="cover"
        transition={200}
        cachePolicy="memory"
    />
));

Thumbnail.displayName = 'Thumbnail';

const MetaInfo = memo(
    ({ category, rating }: { category: string; rating: number }) => (
        <View className="flex-row items-center justify-between mb-3">
            <View className="bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                <Text className="text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-wide">
                    {category}
                </Text>
            </View>

            <View className="flex-row items-center">
                <Icon name="star" size={16} color={theme.light.colors.warning[500]} />
                <Text className="ml-1 text-gray-800 dark:text-gray-200 font-semibold">
                    {rating.toFixed(1)}
                </Text>
            </View>
        </View>
    )
);

MetaInfo.displayName = 'MetaInfo';

const InstructorSection = memo(
    ({
        avatar,
        firstName,
        lastName,
    }: {
        avatar: string;
        firstName: string;
        lastName: string;
    }) => (
        <View className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl flex-row items-center mb-6">
            <Avatar source={avatar} size="md" name={firstName} />
            <View className="ml-3">
                <Text className="text-gray-400 dark:text-gray-500 text-[10px] font-semibold uppercase">
                    Instructor
                </Text>
                <Text className="text-gray-900 dark:text-white font-semibold">
                    {firstName} {lastName}
                </Text>
            </View>
        </View>
    )
);

InstructorSection.displayName = 'InstructorSection';

const SectionTitle = memo(
    ({ title, className = '' }: { title: string; className?: string }) => (
        <Text className={`text-gray-900 dark:text-white font-semibold text-lg ${className}`}>
            {title}
        </Text>
    )
);

SectionTitle.displayName = 'SectionTitle';

export const CourseHeader = memo(
    ({ course, testID, accessibilityLabel }: CourseHeaderProps) => {
        return (
            <View testID={testID} accessibilityLabel={accessibilityLabel}>
                <Thumbnail uri={course.thumbnail} />

                <View className="px-6 pt-6 pb-4">
                    <MetaInfo category={course.category} rating={course.rating} />

                    <Text
                        variant="h1"
                        className="text-gray-900 dark:text-white leading-tight mb-4"
                    >
                        {course.title}
                    </Text>

                    <InstructorSection
                        avatar={course.instructor.avatar}
                        firstName={course.instructor.name.first}
                        lastName={course.instructor.name.last}
                    />

                    <SectionTitle title="About this course" className="mb-2" />

                    <Text className="text-gray-600 dark:text-gray-400 text-sm leading-5 mb-6">
                        {course.description}
                    </Text>

                    <SectionTitle title="What you'll get" />
                </View>
            </View>
        );
    }
);

CourseHeader.displayName = 'CourseHeader';