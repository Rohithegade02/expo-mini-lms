import { ROUTES } from '@/constants/router';
import { useCourses } from '@/hooks/use-courses';
import { useDebounce } from '@/hooks/use-debounce';
import useOrientation from '@/hooks/use-orientation';
import { RelativePathString, useRouter } from 'expo-router';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { CourseListPresentation } from './CourseListPresentation';

// This component is responsible for fetching and managing the course list data.
const CourseListContainer: React.FC = memo(() => {
    const router = useRouter();
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
    const orientation = useOrientation();

    const [localSearch, setLocalSearch] = useState<string>(storeSearchQuery);
    const debouncedSearch = useDebounce(localSearch, 500);

    useEffect(() => {
        if (filteredCourses.length === 0) {
            fetchCourses();
        }
    }, []);

    useEffect(() => {
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
            orientation={orientation}
        />
    );
});


export default CourseListContainer;