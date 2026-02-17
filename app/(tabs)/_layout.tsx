import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import React from 'react';

export default function TabLayout() {
    return (
        <NativeTabs minimizeBehavior="onScrollDown">
            <NativeTabs.Trigger name="courses">
                <Icon src={<VectorIcon family={MaterialCommunityIcons} name="book-outline" />} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <Icon src={<VectorIcon family={MaterialCommunityIcons} name="account" />} />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
