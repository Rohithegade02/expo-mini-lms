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

export interface CourseFooterProps {
    isDark: boolean;
    price: number;
    isEnrolled: boolean;
    isLoading: boolean;
    onEnroll: () => void;
    onViewContent: () => void;
    testID?: string;
    accessibilityLabel?: string;
}
export interface CourseHeaderProps {
    isDark: boolean;
    course: Course;
    testID?: string;
    accessibilityLabel?: string;
}


export interface FeatureItemProps {
    isDark: boolean;
    icon: string;
    label: string;
    testID?: string;
    accessibilityLabel?: string;
}


export interface HeaderBarProps {
    isDark: boolean;
    isBookmarked: boolean;
    onBack: () => void;
    onShare: () => void;
    onToggleBookmark: () => void;
    testID?: string;
    accessibilityLabel?: string;
}