import { deleteItem, getItem, setItem } from '@/lib/storage/secure-storage';

// Storage keys
export enum AuthStorageKeys {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
    USER_ID = 'user_id',
}

/**
 * Save auth tokens
 */
export const saveTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
    await Promise.all([
        setItem(AuthStorageKeys.ACCESS_TOKEN, accessToken),
        setItem(AuthStorageKeys.REFRESH_TOKEN, refreshToken),
    ]);
};

/**
 * Get access token
 */
export const getAccessToken = async (): Promise<string | null> => {
    return getItem(AuthStorageKeys.ACCESS_TOKEN);
};

/**
 * Get refresh token
 */
export const getRefreshToken = async (): Promise<string | null> => {
    return getItem(AuthStorageKeys.REFRESH_TOKEN);
};

/**
 * Clear all auth tokens
 */
export const clearTokens = async (): Promise<void> => {
    await Promise.all([
        deleteItem(AuthStorageKeys.ACCESS_TOKEN),
        deleteItem(AuthStorageKeys.REFRESH_TOKEN),
        deleteItem(AuthStorageKeys.USER_ID),
    ]);
};

/**
 * Check if user is authenticated (has valid token)
 */
export const isAuthenticated = async (): Promise<boolean> => {
    const token = await getAccessToken();
    return token !== null;
};
