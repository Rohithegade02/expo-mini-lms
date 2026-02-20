import { LoadingOverlay } from '@/components/atoms';
import { ThemeToggle } from '@/components/molecules';
import React, { Suspense } from 'react';

const LazyCourseListScreen = React.lazy(() => import('@/screens/courses/list').then(module => ({ default: module.CourseListScreen })))

export default function CoursesPage() {
    return (
        <Suspense fallback={<LoadingOverlay visible={true} message="Loading..." />}>
            <ThemeToggle>
                <LazyCourseListScreen />
            </ThemeToggle>
        </Suspense>
    );
}
