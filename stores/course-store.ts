import { notificationService } from '@/lib/notifications/notification-service';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as mmkvStorage from '../lib/storage/mmkv-storage';
import { zustandStorage } from '../lib/storage/mmkv-storage';
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

            // Actions
            setCourses: (courses) => {
                const { bookmarks, enrolledCourses } = get();

                // Update courses with bookmark and enrollment status
                const updatedCourses = courses.map((course) => ({
                    ...course,
                    isBookmarked: bookmarks.includes(course.id),
                    isEnrolled: enrolledCourses.includes(course.id),
                    progress: mmkvStorage.getCourseProgress(course.id),
                }));

                set({ courses: updatedCourses });
            },

            fetchCourses: async (count) => {
                set({ isLoading: true, error: null });
                try {
                    const { courseApi } = await import('../lib/api/courses');
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
                    mmkvStorage.removeBookmark(courseId);
                } else {
                    newBookmarks = [...bookmarks, courseId];
                    mmkvStorage.addBookmark(courseId);
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
                    mmkvStorage.unenrollCourse(courseId);
                } else {
                    newEnrolledCourses = [...enrolledCourses, courseId];
                    mmkvStorage.enrollCourse(courseId);
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
                mmkvStorage.setCourseProgress(courseId, progress);

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

// Selectors
export const selectFilteredCourses = (state: CourseStore) => {
    const { courses, searchQuery } = state;

    if (!searchQuery.trim()) {
        return courses;
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
};

export const selectBookmarkedCourses = (state: CourseStore) => {
    return state.courses.filter((course) => course.isBookmarked);
};

export const selectEnrolledCourses = (state: CourseStore) => {
    return state.courses.filter((course) => course.isEnrolled);
};
