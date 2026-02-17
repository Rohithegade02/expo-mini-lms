import { useDebounce } from '@/hooks/use-debounce';
import { selectFilteredCourses, useCourseStore } from '@/stores/course-store';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { CourseListPresentation } from './CourseListPresentation';

export const CourseListContainer: React.FC = () => {
    const router = useRouter();
    const {
        isLoading,
        error,
        searchQuery,
        setSearchQuery,
        fetchCourses,
        toggleBookmark
    } = useCourseStore();

    const [localSearch, setLocalSearch] = useState<string>(searchQuery);
    const debouncedSearch = useDebounce(localSearch, 500);

    const courses = useCourseStore(selectFilteredCourses);

    useEffect(() => {
        if (courses.length === 0) {
            fetchCourses();
        }
    }, []);

    useEffect(() => {
        setSearchQuery(debouncedSearch);
    }, [debouncedSearch, setSearchQuery]);

    const handleSearch = useCallback((query: string) => {
        setLocalSearch(query);
    }, []);

    const handleRefresh = useCallback(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleCoursePress = useCallback((courseId: string) => {
        router.push(`/(courses)/${courseId}` as any);
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
