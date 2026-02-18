import { Avatar, Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import React, { memo } from 'react';
import { View } from 'react-native';
import { CourseInstructorProps } from './types';

export const CourseInstructor: React.FC<CourseInstructorProps> = memo(
    ({ instructor, rating, isEnrolled }) => {
        return (
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <Avatar
                        source={instructor.avatar}
                        size="sm"
                        name={instructor.name.first}
                    />
                    <Text variant="caption" className="ml-2 text-gray-600 font-medium">
                        {instructor.name.first} {instructor.name.last}
                    </Text>
                </View>
                {isEnrolled ? (
                    <Text variant="caption" className="text-gray-100 bg-success-500 px-2 py-1 rounded-full font-semibold">
                        Enrolled
                    </Text>
                ) : (
                    <View className="flex-row items-center">
                        <Icon name="star-outline" size={14} color={theme.light.colors.warning[500]} />
                        <Text variant="caption" className="ml-1 text-gray-700 font-semibold">
                            {rating.toFixed(1)}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
);

CourseInstructor.displayName = 'CourseInstructor';
