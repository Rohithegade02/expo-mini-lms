import { Course } from '@/types/course';

export interface CourseInstructorProps {
    instructor: Course['instructor'];
    rating: number;
    isEnrolled: boolean;
    testID?: string;
    accessibilityLabel?: string;
}
