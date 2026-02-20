import { ROUTES } from '@/constants/router';
import { useTheme } from '@/hooks/use-theme';
import { useCourseStore } from '@/stores/course-store';
import { RelativePathString, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Alert, Share } from 'react-native';
import { CourseDetailsPresentation } from './CourseDetailsPresentation';

// This component is responsible for fetching and managing the course details data.
export const CourseDetailsContainer: React.FC = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { isDark } = useTheme();
    const {
        courses,
        toggleBookmark,
        toggleEnrollment,
        isLoading
    } = useCourseStore();

    const course = useMemo(() => {
        return courses.find((c) => c.id === id);
    }, [courses, id]);

    const handleEnroll = useCallback(() => {
        if (!course) return;
        toggleEnrollment(course.id);
        if (!course.isEnrolled) {
            Alert.alert('Success', 'You have enrolled in this course!');
        }
    }, [course, toggleEnrollment]);

    const handleToggleBookmark = useCallback(() => {
        if (!course) return;
        toggleBookmark(course.id);
    }, [course, toggleBookmark]);

    const handleBack = useCallback(() => {
        router.back();
    }, [router]);

    const handleShare = useCallback(async () => {
        if (!course) return;
        try {
            await Share.share({
                message: `Check out this course: ${course.title}`,
                url: course.thumbnail,
            });
        } catch (error) {
            console.error('Error sharing course:', error);
        }
    }, [course]);

    const handleViewContent = useCallback(() => {
        if (!course) return;
        router.push(ROUTES.courses.content(course.id) as RelativePathString);
    }, [course, router]);

    if (!course) {
        return null; // Or show error state
    }

    return (
        <CourseDetailsPresentation
            isDark={isDark}
            course={course}
            isEnrolled={course.isEnrolled}
            isBookmarked={course.isBookmarked}
            isLoading={isLoading}
            onEnroll={handleEnroll}
            onToggleBookmark={handleToggleBookmark}
            onBack={handleBack}
            onShare={handleShare}
            onViewContent={handleViewContent}
        />
    );
};
