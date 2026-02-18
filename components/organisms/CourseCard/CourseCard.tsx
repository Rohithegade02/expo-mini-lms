import { Text } from '@/components/atoms';
import {
    CourseFooter,
    CourseInstructor,
    CourseProgress,
    CourseThumbnail
} from '@/components/molecules';
import { theme } from '@/constants/theme';
import React, { memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { CourseCardProps } from './types';

export const CourseCard: React.FC<CourseCardProps> = memo(
    ({ course, onPress, onToggleBookmark }) => {

        const handlePress = useCallback(() => {
            onPress(course.id);
        }, [course.id, onPress]);

        const handleBookmark = useCallback(() => {
            onToggleBookmark(course.id);
        }, [course.id, onToggleBookmark]);

        return (
            <Pressable
                onPress={handlePress}
                className="bg-white rounded-2xl mb-4 border border-gray-200 overflow-hidden"
                style={{
                    shadowColor: theme.shadows.md.shadowColor,
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 3,
                }}
            >
                <CourseThumbnail
                    thumbnail={course.thumbnail}
                    category={course.category}
                    isBookmarked={course.isBookmarked}
                    onToggleBookmark={handleBookmark}
                />

                <View className="p-4">
                    <CourseInstructor
                        instructor={course.instructor}
                        rating={course.rating}
                        isEnrolled={course.isEnrolled}
                    />

                    <Text
                        variant="h3"
                        numberOfLines={2}
                        className="text-gray-900 mt-2"
                    >
                        {course.title}
                    </Text>

                    {course.isEnrolled && (
                        <CourseProgress progress={course.progress} />
                    )}

                    <CourseFooter
                        price={course.price}
                    />
                </View>
            </Pressable>
        );
    }
);

CourseCard.displayName = 'CourseCard';
