import { courseApi } from '@/lib/api/courses';
import { getSmartRecommendations } from '@/lib/api/gemini';
import { notificationService } from '@/lib/notifications/notification-service';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as courseStorage from '../lib/storage/course.storage';
import { zustandStorage } from '../lib/storage/mmkv';
import type { Course, CourseState } from '../types/course';

interface CourseActions {
    setCourses: (courses: Course[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSearchQuery: (query: string) => void;
    fetchCourses: (count?: number) => Promise<void>;
    toggleBookmark: (courseId: string) => void;
    toggleEnrollment: (courseId: string) => void;
    updateProgress: (courseId: string, progress: number) => void;
    clearError: () => void;
    performSmartSearch: (query: string) => Promise<void>;
}

type CourseStore = CourseState & CourseActions;

export const useCourseStore = create<CourseStore>()(
    persist(
        (set, get) => ({
            // Initial state
            courses: [],
            bookmarks: [],
            enrolledCourses: [],
            searchQuery: '',
            isLoading: false,
            error: null,
            isSmartSearchLoading: false,
            smartRecommendations: [],

            // Actions
            setCourses: (courses) => {
                const { bookmarks, enrolledCourses } = get();

                // Update courses with bookmark and enrollment status
                const updatedCourses = courses.map((course) => ({
                    ...course,
                    isBookmarked: bookmarks.includes(course.id),
                    isEnrolled: enrolledCourses.includes(course.id),
                    progress: courseStorage.getCourseProgress(course.id),
                }));

                set({ courses: updatedCourses });
            },

            fetchCourses: async (count) => {
                set({ isLoading: true, error: null });
                try {
                    const courses = await courseApi.getMappedCourses(count);
                    get().setCourses(courses);
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Failed to fetch courses';
                    set({ error: message });
                } finally {
                    set({ isLoading: false });
                }
            },

            setLoading: (loading) => {
                set({ isLoading: loading });
            },

            setError: (error) => {
                set({ error });
            },

            setSearchQuery: (query) => {
                set({ searchQuery: query });
            },

            toggleBookmark: (courseId) => {
                const { bookmarks, courses } = get();
                const isBookmarked = bookmarks.includes(courseId);

                let newBookmarks: string[];
                if (isBookmarked) {
                    newBookmarks = bookmarks.filter((id) => id !== courseId);
                    courseStorage.removeBookmark(courseId);
                } else {
                    newBookmarks = [...bookmarks, courseId];
                    courseStorage.addBookmark(courseId);
                }

                // Update courses
                const updatedCourses = courses.map((course) =>
                    course.id === courseId
                        ? { ...course, isBookmarked: !isBookmarked }
                        : course
                );

                set({ bookmarks: newBookmarks, courses: updatedCourses });

                // Phase 5: Trigger notification for learning goal (5 bookmarks)
                if (newBookmarks.length === 5 && !isBookmarked) {
                    notificationService.scheduleNotification(
                        "Learning Goal Reached! 🚀",
                        "You've bookmarked 5 courses! Ready to start one of them?",
                        { type: 'bookmarks' }
                    );
                }
            },

            toggleEnrollment: (courseId) => {
                const { enrolledCourses, courses } = get();
                const isEnrolled = enrolledCourses.includes(courseId);

                let newEnrolledCourses: string[];
                if (isEnrolled) {
                    newEnrolledCourses = enrolledCourses.filter((id) => id !== courseId);
                    courseStorage.unenrollCourse(courseId);
                } else {
                    newEnrolledCourses = [...enrolledCourses, courseId];
                    courseStorage.enrollCourse(courseId);
                }

                // Update courses
                const updatedCourses = courses.map((course) =>
                    course.id === courseId
                        ? { ...course, isEnrolled: !isEnrolled }
                        : course
                );

                set({ enrolledCourses: newEnrolledCourses, courses: updatedCourses });
            },

            updateProgress: (courseId, progress) => {
                const { courses } = get();

                // Save to MMKV
                courseStorage.setCourseProgress(courseId, progress);

                // Update courses
                const updatedCourses = courses.map((course) =>
                    course.id === courseId
                        ? { ...course, progress }
                        : course
                );

                set({ courses: updatedCourses });
            },

            clearError: () => {
                set({ error: null });
            },

            performSmartSearch: async (query) => {
                const { courses } = get();
                if (!query.trim()) {
                    set({ smartRecommendations: [] });
                    return;
                }

                set({ isSmartSearchLoading: true, error: null });
                try {
                    const recommendations = await getSmartRecommendations(query, courses);
                    set({ smartRecommendations: recommendations });
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Failed to get smart recommendations';
                    set({ error: message });
                } finally {
                    set({ isSmartSearchLoading: false });
                }
            },
        }),
        {
            name: 'course-storage',
            storage: createJSONStorage(() => zustandStorage),
            // Persist bookmarks and enrolled courses
            partialize: (state) => ({
                bookmarks: state.bookmarks,
                enrolledCourses: state.enrolledCourses,
            }),
        }
    )
);
