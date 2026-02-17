import { ROUTES } from '@/constants/router';
import { useDebounce } from '@/hooks/use-debounce';
import { selectFilteredCourses, useCourseStore } from '@/stores/course-store';
import { RelativePathString, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CourseListPresentation } from './CourseListPresentation';

export const CourseListContainer: React.FC = () => {
    const router = useRouter();

    // Select state using granular selectors to avoid unnecessary re-renders
    const isLoading = useCourseStore((state) => state.isLoading);
    const error = useCourseStore((state) => state.error);
    const storeSearchQuery = useCourseStore((state) => state.searchQuery);
    const setSearchQuery = useCourseStore((state) => state.setSearchQuery);
    const fetchCourses = useCourseStore((state) => state.fetchCourses);
    const toggleBookmark = useCourseStore((state) => state.toggleBookmark);

    // Use useShallow for the filtered courses array to prevent re-renders when the array content is the same
    const courses = useCourseStore(useShallow(selectFilteredCourses));

    const [localSearch, setLocalSearch] = useState<string>(storeSearchQuery);
    const debouncedSearch = useDebounce(localSearch, 500);

    // Sync local search with store search query on mount (in case navigating back)
    useEffect(() => {
        setLocalSearch(storeSearchQuery);
    }, []);

    // Fetch courses on mount if empty
    useEffect(() => {
        if (courses.length === 0) {
            fetchCourses();
        }
    }, []);

    // Update store search query when debounced search changes
    useEffect(() => {
        // Only update if different to avoid loop
        if (debouncedSearch !== storeSearchQuery) {
            setSearchQuery(debouncedSearch);
        }
    }, [debouncedSearch, setSearchQuery, storeSearchQuery]);

    const handleSearch = useCallback((query: string) => {
        setLocalSearch(query);
    }, []);

    const handleRefresh = useCallback(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleCoursePress = useCallback((courseId: string) => {
        router.push(ROUTES.courses.details(courseId) as RelativePathString);
    }, [router]);

    const handleToggleBookmark = useCallback((courseId: string) => {
        toggleBookmark(courseId);
    }, [toggleBookmark]);

    return (
        <CourseListPresentation
            courses={courses}
            isLoading={isLoading}
            error={error}
            searchQuery={localSearch}
            onSearch={handleSearch}
            onRefresh={handleRefresh}
            onCoursePress={handleCoursePress}
            onToggleBookmark={handleToggleBookmark}
        />
    );
};
