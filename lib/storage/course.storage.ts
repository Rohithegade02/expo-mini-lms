import { storage } from '@/lib/storage/mmkv';

// Storage keys
export enum CourseStorageKeys {
    BOOKMARKS = 'bookmarks',
    ENROLLED_COURSES = 'enrolled_courses',
    COURSE_PROGRESS = 'course_progress',
}

// Generic get/set helpers
const setItem = <T>(key: CourseStorageKeys, value: T): void => {
    try {
        const jsonValue = JSON.stringify(value);
        storage.set(key, jsonValue);
    } catch (error) {
        console.error(`Error saving to MMKV (${key}):`, error);
    }
};

const getItem = <T>(key: CourseStorageKeys): T | null => {
    try {
        const jsonValue = storage.getString(key);
        return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error(`Error reading from MMKV (${key}):`, error);
        return null;
    }
};

// Bookmark methods
export const getBookmarks = (): string[] => {
    return getItem<string[]>(CourseStorageKeys.BOOKMARKS) || [];
};

export const setBookmarks = (bookmarks: string[]): void => {
    setItem(CourseStorageKeys.BOOKMARKS, bookmarks);
};

export const addBookmark = (courseId: string): void => {
    const bookmarks = getBookmarks();
    if (!bookmarks.includes(courseId)) {
        setBookmarks([...bookmarks, courseId]);
    }
};

export const removeBookmark = (courseId: string): void => {
    const bookmarks = getBookmarks();
    setBookmarks(bookmarks.filter((id) => id !== courseId));
};

export const isBookmarked = (courseId: string): boolean => {
    return getBookmarks().includes(courseId);
};

// Enrolled courses methods
export const getEnrolledCourses = (): string[] => {
    return getItem<string[]>(CourseStorageKeys.ENROLLED_COURSES) || [];
};

export const setEnrolledCourses = (courses: string[]): void => {
    setItem(CourseStorageKeys.ENROLLED_COURSES, courses);
};

export const enrollCourse = (courseId: string): void => {
    const enrolled = getEnrolledCourses();
    if (!enrolled.includes(courseId)) {
        setEnrolledCourses([...enrolled, courseId]);
    }
};

export const unenrollCourse = (courseId: string): void => {
    const enrolled = getEnrolledCourses();
    setEnrolledCourses(enrolled.filter((id) => id !== courseId));
};

export const isEnrolled = (courseId: string): boolean => {
    return getEnrolledCourses().includes(courseId);
};

// Course progress methods
export const getCourseProgress = (courseId: string): number => {
    const allProgress = getItem<Record<string, number>>(CourseStorageKeys.COURSE_PROGRESS) || {};
    return allProgress[courseId] || 0;
};

export const setCourseProgress = (courseId: string, progress: number): void => {
    const allProgress = getItem<Record<string, number>>(CourseStorageKeys.COURSE_PROGRESS) || {};
    allProgress[courseId] = progress;
    setItem(CourseStorageKeys.COURSE_PROGRESS, allProgress);
};
