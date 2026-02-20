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
        formData.append('avatar', {
            uri: avatarFile.uri,
            name: avatarFile.name,
            type: avatarFile.type,
        } as unknown as Blob);

        return apiClient.post<APIResponse<User>>('/users/avatar', formData, {
            headers: {
                'Content-Type': undefined,
            } as unknown as Record<string, string>,
            transformRequest: (data) => {
                return data;
            },
        });
    },
};
