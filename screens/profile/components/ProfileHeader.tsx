import { Avatar, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { ProfileHeaderProps } from '../types';

// This is the header component for the profile screen
export const ProfileHeader = memo(({ user, onUpdateAvatar, testID, accessibilityLabel }: ProfileHeaderProps) => {
    const avatarSource =
        typeof user.avatar === 'string'
            ? user.avatar
            : user.avatar?.url;

    return (
        <View className="py-2.5 items-center" testID={testID} accessibilityLabel={accessibilityLabel}>
            <Avatar
                source={avatarSource || undefined}
                size="xl"
                name={user.username}
                className="shadow-sm"
            />

            <Pressable
                onPress={onUpdateAvatar}
                className="mt-3 flex-row items-center bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-full"
            >
                <Ionicons name="camera-outline" size={16} color={theme.light.colors.primary[600]} />
                <Text className="ml-2 text-primary-600 dark:text-primary-400 font-medium text-xs">
                    Change Photo
                </Text>
            </Pressable>

            <Text variant="h2" className="mt-5 text-gray-900 dark:text-gray-100 font-bold">
                {user.username}
            </Text>

            <Text variant="body" className="text-gray-500 dark:text-gray-400 mt-1">
                {user.email}
            </Text>
        </View>
    );
});

ProfileHeader.displayName = 'ProfileHeader';
