import { Course } from '@/types/course';

export interface CourseListPresentationProps {
    courses: Course[];
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
    onSearch: (query: string) => void;
    onRefresh: () => void;
    onCoursePress: (courseId: string) => void;
    onToggleBookmark: (courseId: string) => void;
    testID?: string;
    accessibilityLabel?: string;
}
