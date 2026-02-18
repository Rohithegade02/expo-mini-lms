import { LegendList } from '@legendapp/list';
import React, { memo, useMemo } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileFooter } from './components/ProfileFooter';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileMenuItem } from './components/ProfileMenuItem';
import { MenuItem, ProfilePresentationProps } from './types';

export const ProfilePresentation: React.FC<ProfilePresentationProps> = memo(({
    user,
    onLogout,
    onUpdateAvatar,
    testID = "profile-screen",
    accessibilityLabel = "profile-screen",
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
        <SafeAreaView className="flex-1 px-4 py-10" testID={testID} accessibilityLabel={accessibilityLabel}>
            <LegendList
                data={menuItems}
                renderItem={({ item, index }) => (
                    <ProfileMenuItem
                        item={item}
                        isFirst={index === 0}
                        isLast={index === menuItems.length - 1}
                        testID={`${testID}-item-${item.id}`}
                        accessibilityLabel={`${testID}-item-${item.id}`}
                    />
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <ProfileHeader
                        user={user}
                        onUpdateAvatar={onUpdateAvatar}
                    />
                }
                contentContainerClassName="flex-1"
                testID={`${testID}-list`}
                accessibilityLabel={`${testID}-list`}
            />
            <ProfileFooter
                version="1.0.0"
                testID={`${testID}-footer`}
                accessibilityLabel={`${testID}-footer`}
            />
        </SafeAreaView>
    );
});

ProfilePresentation.displayName = 'ProfilePresentation';
