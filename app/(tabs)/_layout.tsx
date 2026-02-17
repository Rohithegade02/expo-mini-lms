import { Icon } from '@/components/atoms';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#2563eb',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: '#e5e7eb',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="courses"
                options={{
                    title: 'Courses',
                    tabBarIcon: ({ color }) => <Icon name="book-outline" color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Icon name="person-outline" color={color} size={24} />,
                }}
            />
        </Tabs>
    );
}
