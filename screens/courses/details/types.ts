import { Course } from '@/types/course';

export interface CourseDetailsPresentationProps {
    course: Course;
    isDark: boolean;
    isEnrolled: boolean;
    isBookmarked: boolean;
    isLoading: boolean;
    onEnroll: () => void;
    onToggleBookmark: () => void;
    onBack: () => void;
    onShare: () => void;
    onViewContent: () => void;
    testID?: string;
    accessibilityLabel?: string;
}
