import { useImagePicker } from '@/hooks/use-image-picker';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/auth-store';
import React, { memo, useCallback } from 'react';
import { Alert } from 'react-native';
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

    const { pickImage } = useImagePicker({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    const handleUpdateAvatar = useCallback(async () => {
        try {
            const uri = await pickImage();

            console.log(uri);
            if (uri) {
                const fileName = uri.split('/').pop();

                if (!fileName) {
                    Alert.alert('Error', 'Failed to get filename');
                    return;
                }

                const avatarFile = {
                    uri: uri,
                    name: fileName,
                    type: 'image/jpeg',
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
