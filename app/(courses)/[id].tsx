import { CourseDetailsContainer } from '@/screens/courses/details/CourseDetailsContainer';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function CourseDetailsPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log(id, 'id');
    return <CourseDetailsContainer />;
}
