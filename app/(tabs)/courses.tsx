import { ThemeToggle } from '@/components/molecules';
import { CourseListScreen } from '@/screens/courses/list';
import React from 'react';

export default function CoursesPage() {
    return (
        <ThemeToggle>
            <CourseListScreen />
        </ThemeToggle>
    );
}
