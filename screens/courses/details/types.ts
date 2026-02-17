import { Course } from '@/types/course';

export interface CourseDetailsPresentationProps {
    course: Course;
    isEnrolled: boolean;
    isBookmarked: boolean;
    isLoading: boolean;
    onEnroll: () => void;
    onToggleBookmark: () => void;
    onBack: () => void;
    onShare: () => void;
    onViewContent: () => void;
}
