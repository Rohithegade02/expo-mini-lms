import { Avatar, Text } from '@/components/atoms';
import { User } from '@/types/auth';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';

interface ProfileHeaderProps {
    user: User;
    onUpdateAvatar: () => void;
}

export const ProfileHeader = memo(({ user, onUpdateAvatar }: ProfileHeaderProps) => {
    const avatarSource =
        typeof user.avatar === 'string'
            ? user.avatar
            : user.avatar?.url;

    return (
        <View className="py-2.5 items-center">
            <Avatar
                source={avatarSource || undefined}
                size="xl"
                name={user.username}
                className="shadow-sm"
            />

            <Pressable
                onPress={onUpdateAvatar}
                className="mt-3 flex-row items-center bg-blue-50 px-3 py-1.5 rounded-full"
            >
                <Ionicons name="camera-outline" size={16} color="#2563eb" />
                <Text className="ml-2 text-blue-600 font-medium text-xs">
                    Change Photo
                </Text>
            </Pressable>

            <Text variant="h2" className="mt-5 text-gray-900 font-bold">
                {user.username}
            </Text>

            <Text variant="body" className="text-gray-500 mt-1">
                {user.email}
            </Text>
        </View>
    );
});

ProfileHeader.displayName = 'ProfileHeader';
