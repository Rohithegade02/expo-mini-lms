import { Avatar, Text } from '@/components/atoms';
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useMemo } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfilePresentationProps } from './types';

export const ProfilePresentation: React.FC<ProfilePresentationProps> = memo(({
    user,
    onLogout,
    onUpdateAvatar,
    isLoading,
}) => {
    if (!user) return null;

    const menuItems = useMemo(() => [
        {
            id: 'progress',
            label: 'My Progress',
            onPress: () => Alert.alert('Stats', 'Learning progress coming soon!'),
            icon: 'analytics-outline' as const,
        },
        {
            id: 'settings',
            label: 'Settings',
            onPress: () => Alert.alert('Settings', 'Account settings coming soon!'),
            icon: 'settings-outline' as const,
        },
        {
            id: 'logout',
            label: 'Log Out',
            onPress: onLogout,
            icon: 'log-out-outline' as const,
            isDestructive: true,
        },
    ], [onLogout]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ProfileHeader
                user={user}
                onUpdateAvatar={onUpdateAvatar}
            />

            <View className="mt-6 px-4">
                <View className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                    {menuItems.map((item, index) => (
                        <ProfileMenuItem
                            key={item.id}
                            item={item}
                            isLast={index === menuItems.length - 1}
                        />
                    ))}
                </View>
            </View>

            <ProfileFooter version="1.0.0" />
        </SafeAreaView>
    );
});

const ProfileHeader = memo(({ user, onUpdateAvatar }: { user: any, onUpdateAvatar: () => void }) => (
    <View className="bg-white px-6 pt-12 pb-8 items-center border-b border-gray-200">
        <Pressable onPress={onUpdateAvatar} className="relative">
            <Avatar
                source={user.avatar || undefined}
                size="xl"
                name={user.username}
            />
            <View className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-2 border-white items-center justify-center">
                <Ionicons name="camera-outline" size={16} color="white" />
            </View>
        </Pressable>

        <Text variant="h2" className="mt-4 text-gray-900">{user.username}</Text>
        <Text variant="body" className="text-gray-500">{user.email}</Text>
    </View>
));

const ProfileMenuItem = memo(({
    item,
    isLast
}: {
    item: {
        label: string;
        onPress: () => void;
        icon: keyof typeof Ionicons.glyphMap;
        isDestructive?: boolean;
    };
    isLast: boolean;
}) => (
    <Pressable
        className={`flex-row items-center px-4 py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}
        onPress={item.onPress}
    >
        <View className={`p-2 rounded-lg mr-4 ${item.isDestructive ? 'bg-red-50' : 'bg-blue-50'}`}>
            <Ionicons
                name={item.icon}
                size={20}
                color={item.isDestructive ? '#dc2626' : '#2563eb'}
            />
        </View>
        <Text className={`flex-1 font-medium ${item.isDestructive ? 'text-red-600' : 'text-gray-700'}`}>
            {item.label}
        </Text>
        {!item.isDestructive && (
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
        )}
    </Pressable>
));

const ProfileFooter = memo(({ version }: { version: string }) => (
    <View className="p-8 items-center">
        <Text variant="caption" className="text-gray-400">Version {version}</Text>
    </View>
));
