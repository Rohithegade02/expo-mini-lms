import { Stack } from 'expo-router';
import React from 'react';

export default function CourseLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="[id]" />
            <Stack.Screen name="content/[id]" />
        </Stack>
    );
}
