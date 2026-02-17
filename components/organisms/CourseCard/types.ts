import { Course } from '@/types/course';

export interface CourseCardProps {
    course: Course;
    onPress: (id: string) => void;
    onToggleBookmark: (id: string) => void;
}
