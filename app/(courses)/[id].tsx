import { LoadingOverlay } from '@/components/atoms';
import { useLocalSearchParams } from 'expo-router';
import React, { Suspense } from 'react';

const LazyCourseDetailsContainer = React.lazy(() => import('@/screens/courses/details/CourseDetailsContainer').then(module => ({ default: module.CourseDetailsContainer })))

export default function CourseDetailsPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    return <Suspense fallback={<LoadingOverlay visible={true} message="Loading..." />}>
        <LazyCourseDetailsContainer />
    </Suspense>;
}
