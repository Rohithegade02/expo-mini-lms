export interface Instructor {
    id: string;
    name: {
        first: string;
        last: string;
        title?: string;
    };
    avatar: string;
    email: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    instructor: Instructor;
    category: string;
    rating: number;
    isBookmarked: boolean;
    isEnrolled: boolean;
    progress: number; // 0-100
}

export interface CourseState {
    courses: Course[];
    bookmarks: string[]; // course IDs
    enrolledCourses: string[]; // course IDs
    searchQuery: string;
    isLoading: boolean;
    error: string | null;
}

export interface CourseProgress {
    courseId: string;
    progress: number;
    lastAccessed: string;
}
