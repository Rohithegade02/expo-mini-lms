import { ROUTES } from '@/constants/router';
import { useCourses } from '@/hooks/use-courses';
import { useDebounce } from '@/hooks/use-debounce';
import { RelativePathString, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { CourseListPresentation } from './CourseListPresentation';

const CourseListContainer: React.FC = () => {
    const router = useRouter();

    // Select state using custom hook
    const {
        filteredCourses,
        isLoading,
        error,
        searchQuery: storeSearchQuery,
        setSearchQuery,
        fetchCourses,
        toggleBookmark,
        isSmartSearchLoading,
        performSmartSearch
    } = useCourses();

    const [localSearch, setLocalSearch] = useState<string>(storeSearchQuery);
    const debouncedSearch = useDebounce(localSearch, 500);

    // // Sync local search with store search query on mount (in case navigating back)
    // useEffect(() => {
    //     setLocalSearch(storeSearchQuery);
    // }, []);

    // Fetch courses on mount if empty
    useEffect(() => {
        if (filteredCourses.length === 0) {
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

    const handleSmartSearch = useCallback((query: string) => {
        performSmartSearch(query);
    }, [performSmartSearch]);

    return (
        <CourseListPresentation
            courses={filteredCourses}
            isLoading={isLoading}
            error={error}
            searchQuery={localSearch}
            onSearch={handleSearch}
            isSmartSearchLoading={isSmartSearchLoading}
            onSmartSearch={handleSmartSearch}
            onRefresh={handleRefresh}
            onCoursePress={handleCoursePress}
            onToggleBookmark={handleToggleBookmark}
        />
    );
};


export default CourseListContainer;