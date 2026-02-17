import * as ImagePicker from 'expo-image-picker';
import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
import { authApi } from '../../lib/api/auth';
import { useAuthStore } from '../../stores/auth-store';
import { ProfilePresentation } from './ProfilePresentation';

export const ProfileContainer: React.FC = memo(() => {
    const { user, logout, isLoading, refreshProfile } = useAuthStore();

    const handleLogout = useCallback(async () => {
        try {
            await logout();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Logout failed';
            Alert.alert('Error', message);
        }
    }, [logout]);

    const handleUpdateAvatar = useCallback(async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                const avatarFile = {
                    uri: asset.uri,
                    name: asset.fileName || 'avatar.jpg',
                    type: asset.mimeType || 'image/jpeg',
                };

                await authApi.updateAvatar(avatarFile);
                await refreshProfile();
                Alert.alert('Success', 'Profile picture updated successfully');
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to update avatar';
            Alert.alert('Error', message);
        }
    }, [refreshProfile]);

    return (
        <ProfilePresentation
            user={user}
            onLogout={handleLogout}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
        />
    );
});
