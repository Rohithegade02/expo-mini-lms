import { Avatar, Text } from '@/components/atoms';
import { User } from '@/types/auth';
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useMemo } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfilePresentationProps } from './types';


// ============================
// 🔹 Interfaces
// ============================

interface MenuItem {
    id: string;
    label: string;
    onPress: () => void;
    icon: keyof typeof Ionicons.glyphMap;
    isDestructive?: boolean;
}

interface ProfileHeaderProps {
    user: User;
    onUpdateAvatar: () => void;
}

interface ProfileMenuItemProps {
    item: MenuItem;
    isLast: boolean;
}

interface ProfileFooterProps {
    version: string;
}


// ============================
// 🔹 Main Component
// ============================

export const ProfilePresentation: React.FC<ProfilePresentationProps> = memo(({
    user,
    onLogout,
    onUpdateAvatar,
}) => {
    if (!user) return null;

    const menuItems: MenuItem[] = useMemo(() => [
        {
            id: 'progress',
            label: 'My Progress',
            onPress: () => Alert.alert('Stats', 'Learning progress coming soon!'),
            icon: 'analytics-outline',
        },
        {
            id: 'settings',
            label: 'Settings',
            onPress: () => Alert.alert('Settings', 'Account settings coming soon!'),
            icon: 'settings-outline',
        },
        {
            id: 'logout',
            label: 'Log Out',
            onPress: onLogout,
            icon: 'log-out-outline',
            isDestructive: true,
        },
    ], [onLogout]);

    return (
        <SafeAreaView className="flex-1 bg-gray-100">

            <ProfileHeader
                user={user}
                onUpdateAvatar={onUpdateAvatar}
            />

            {/* Menu Card */}
            <View className="px-5 mt-6">
                <View className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
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

ProfilePresentation.displayName = 'ProfilePresentation';


// ============================
// 🔹 Header
// ============================

const ProfileHeader = memo(({ user, onUpdateAvatar }: ProfileHeaderProps) => {
    const avatarSource =
        typeof user.avatar === 'string'
            ? user.avatar
            : user.avatar?.url;

    return (
        <View className="bg-white pt-14 pb-8 px-6 items-center border-b border-gray-200">

            <Avatar
                source={avatarSource || undefined}
                size="xl"
                name={user.username}
            />

            <Pressable
                onPress={onUpdateAvatar}
                className="mt-3 flex-row items-center"
            >
                <Ionicons name="camera-outline" size={16} color="#2563eb" />
                <Text className="ml-2 text-blue-600 font-medium text-sm">
                    Change Photo
                </Text>
            </Pressable>

            <Text variant="h2" className="mt-5 text-gray-900">
                {user.username}
            </Text>

            <Text variant="body" className="text-gray-500 mt-1">
                {user.email}
            </Text>

        </View>
    );
});

ProfileHeader.displayName = 'ProfileHeader';


// ============================
// 🔹 Menu Item
// ============================

const ProfileMenuItem = memo(({ item, isLast }: ProfileMenuItemProps) => (
    <Pressable
        onPress={item.onPress}
        className={`flex-row items-center px-5 py-4 ${!isLast ? 'border-b border-gray-100' : ''
            }`}
    >
        <View
            className={`p-2 rounded-xl mr-4 ${item.isDestructive ? 'bg-red-50' : 'bg-blue-50'
                }`}
        >
            <Ionicons
                name={item.icon}
                size={20}
                color={item.isDestructive ? '#dc2626' : '#2563eb'}
            />
        </View>

        <Text
            className={`flex-1 font-medium ${item.isDestructive ? 'text-red-600' : 'text-gray-800'
                }`}
        >
            {item.label}
        </Text>

        {!item.isDestructive && (
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
        )}
    </Pressable>
));

ProfileMenuItem.displayName = 'ProfileMenuItem';


// ============================
// 🔹 Footer
// ============================

const ProfileFooter = memo(({ version }: ProfileFooterProps) => (
    <View className="mt-auto py-8 items-center">
        <Text variant="caption" className="text-gray-400">
            Version {version}
        </Text>
    </View>
));

ProfileFooter.displayName = 'ProfileFooter';
