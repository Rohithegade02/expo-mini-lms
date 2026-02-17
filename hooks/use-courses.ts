import { selectFilteredCourses, useCourseStore } from '@/stores/course-store';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';

/**
 * Hook to access course-related data and actions.
 * Extracts methods from the store to avoid direct store usage in components.
 */
export const useCourses = () => {
    // Select data properties using shallow to prevent unnecessary re-renders
    const {
        courses,
        bookmarks,
        enrolledCourses,
        searchQuery,
        isLoading,
        error,
        filteredCourses
    } = useCourseStore(
        useShallow((state) => ({
            courses: state.courses,
            bookmarks: state.bookmarks,
            enrolledCourses: state.enrolledCourses,
            searchQuery: state.searchQuery,
            isLoading: state.isLoading,
            error: state.error,
            filteredCourses: selectFilteredCourses(state)
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

    // Derived state or helper functions can be added here
    const isBookmarked = useCallback((courseId: string) => {
        return bookmarks.includes(courseId);
    }, [bookmarks]);

    const isEnrolled = useCallback((courseId: string) => {
        return enrolledCourses.includes(courseId);
    }, [enrolledCourses]);

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

        // Helpers
        isBookmarked,
        isEnrolled,
        getCourseProgress
    };
};
