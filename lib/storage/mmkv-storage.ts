import { createMMKV } from 'react-native-mmkv';
// Storage keys
export enum MMKVStorageKeys {
    BOOKMARKS = 'bookmarks',
    ENROLLED_COURSES = 'enrolled_courses',
    COURSE_PROGRESS = 'course_progress',
    USER_PREFERENCES = 'user_preferences',
    LAST_APP_OPEN = 'last_app_open',
}

// Initialize MMKV instance
export const storage = createMMKV();

// Generic get/set helpers
export const setItem = <T>(key: MMKVStorageKeys, value: T): void => {
    try {
        const jsonValue = JSON.stringify(value);
        storage.set(key, jsonValue);
    } catch (error) {
        console.error(`Error saving to MMKV (${key}):`, error);
    }
};

export const getItem = <T>(key: MMKVStorageKeys): T | null => {
    try {
        const jsonValue = storage.getString(key);
        return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error(`Error reading from MMKV (${key}):`, error);
        return null;
    }
};

export const deleteItem = (key: MMKVStorageKeys): void => {
    try {
        storage.remove(key);
    } catch (error) {
        console.error(`Error deleting from MMKV (${key}):`, error);
    }
};

export const clearAll = (): void => {
    try {
        storage.clearAll();
    } catch (error) {
        console.error('Error clearing MMKV storage:', error);
    }
};

// Bookmark methods
export const getBookmarks = (): string[] => {
    return getItem<string[]>(MMKVStorageKeys.BOOKMARKS) || [];
};

export const setBookmarks = (bookmarks: string[]): void => {
    setItem(MMKVStorageKeys.BOOKMARKS, bookmarks);
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
    return getItem<string[]>(MMKVStorageKeys.ENROLLED_COURSES) || [];
};

export const setEnrolledCourses = (courses: string[]): void => {
    setItem(MMKVStorageKeys.ENROLLED_COURSES, courses);
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
    const allProgress = getItem<Record<string, number>>(MMKVStorageKeys.COURSE_PROGRESS) || {};
    return allProgress[courseId] || 0;
};

export const setCourseProgress = (courseId: string, progress: number): void => {
    const allProgress = getItem<Record<string, number>>(MMKVStorageKeys.COURSE_PROGRESS) || {};
    allProgress[courseId] = progress;
    setItem(MMKVStorageKeys.COURSE_PROGRESS, allProgress);
};

// Last app open timestamp
export const setLastAppOpen = (timestamp: number): void => {
    setItem(MMKVStorageKeys.LAST_APP_OPEN, timestamp);
};

export const getLastAppOpen = (): number | null => {
    return getItem<number>(MMKVStorageKeys.LAST_APP_OPEN);
};
