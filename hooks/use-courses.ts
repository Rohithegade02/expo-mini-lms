import { useCourseStore } from '@/stores/course-store';
import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

/**
 * Hook to access course-related data and actions.
 * Extracts methods from the store to avoid direct store usage in components.
 */
export const useCourses = () => {
    const {
        courses,
        bookmarks,
        enrolledCourses,
        searchQuery,
        isLoading,
        error,
        isSmartSearchLoading,
        smartRecommendations
    } = useCourseStore(
        useShallow((state) => ({
            courses: state.courses,
            bookmarks: state.bookmarks,
            enrolledCourses: state.enrolledCourses,
            searchQuery: state.searchQuery,
            isLoading: state.isLoading,
            error: state.error,
            isSmartSearchLoading: state.isSmartSearchLoading,
            smartRecommendations: state.smartRecommendations
        }))
    );

    // Get actions (stable references, no need for shallow)
    const fetchCourses = useCourseStore((state) => state.fetchCourses);
    const setCourses = useCourseStore((state) => state.setCourses);
    const setLoading = useCourseStore((state) => state.setLoading);
    const setError = useCourseStore((state) => state.setError);
    const clearError = useCourseStore((state) => state.clearError);
    const setSearchQuery = useCourseStore((state) => state.setSearchQuery);
    const toggleBookmark = useCourseStore((state) => state.toggleBookmark);
    const toggleEnrollment = useCourseStore((state) => state.toggleEnrollment);
    const updateProgress = useCourseStore((state) => state.updateProgress);
    const performSmartSearch = useCourseStore((state) => state.performSmartSearch);

    // Derived state or helper functions can be added here
    const filteredCourses = useMemo(() => {
        if (!searchQuery.trim()) {
            return courses;
        }

        if (smartRecommendations.length > 0) {
            return courses.filter(course => smartRecommendations.includes(course.id));
        }

        const query = searchQuery.toLowerCase();
        return courses.filter(
            (course) =>
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query) ||
                course.category.toLowerCase().includes(query) ||
                `${course.instructor.name.first} ${course.instructor.name.last}`
                    .toLowerCase()
                    .includes(query)
        );
    }, [courses, searchQuery, smartRecommendations]);

    // Helper to check if a course is bookmarked
    const isBookmarked = useCallback((courseId: string) => {
        return bookmarks.includes(courseId);
    }, [bookmarks]);

    // Helper to check if a course is enrolled
    const isEnrolled = useCallback((courseId: string) => {
        return enrolledCourses.includes(courseId);
    }, [enrolledCourses]);

    // Helper to get course progress
    const getCourseProgress = useCallback((courseId: string) => {
        const course = courses.find(c => c.id === courseId);
        return course?.progress || 0;
    }, [courses]);

    return {
        // State
        courses,
        filteredCourses,
        bookmarks,
        enrolledCourses,
        searchQuery,
        isLoading,
        isSmartSearchLoading,
        error,

        // Actions
        fetchCourses,
        setCourses,
        setLoading,
        setError,
        clearError,
        setSearchQuery,
        toggleBookmark,
        toggleEnrollment,
        updateProgress,
        performSmartSearch,

        // Helpers
        isBookmarked,
        isEnrolled,
        getCourseProgress
    };
};
