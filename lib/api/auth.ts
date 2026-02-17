import { APIResponse } from '../../types/api';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../../types/auth';
import { apiClient } from './client';

/**
 * Authentication API Service
 * 
 * Base routes: /api/v1/users
 */
export const authApi = {
    /**
     * Register a new user
     */
    register: (data: RegisterData): Promise<APIResponse<undefined>> => {
        return apiClient.post<APIResponse<undefined>>('/users/register', data);
    },

    /**
     * Login user
     */
    login: (credentials: LoginCredentials): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>('/users/login', credentials);
    },

    /**
     * Logout user
     */
    logout: (): Promise<APIResponse<undefined>> => {
        return apiClient.post<APIResponse<undefined>>('/users/logout');
    },

    /**
     * Get current user profile
     */
    getCurrentUser: (): Promise<APIResponse<User>> => {
        return apiClient.get<APIResponse<User>>('/users/current-user');
    },

    /**
     * Refresh access token
     */
    refreshToken: (refreshToken: string): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>('/users/refresh-token', { refreshToken });
    },

    /**
     * Update user avatar
     */
    updateAvatar: (avatarFile: { uri: string; name: string; type: string }): Promise<APIResponse<User>> => {
        const formData = new FormData();
        // In React Native, FormData.append can take an object for files
        formData.append('avatar', avatarFile as any); // any is unfortunately common for RN FormData but let's see if we can avoid it. 
        // Actually, for RN FormData, the 'any' is often necessary because of the custom object structure.
        // But we'll try to keep the interface strict.

        return apiClient.post<APIResponse<User>>('/users/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};
