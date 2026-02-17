import * as SecureStore from 'expo-secure-store';

// Storage keys
export enum SecureStorageKeys {
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
    USER_ID = 'user_id',
}

/**
 * Save a value to secure storage
 */
export const setItem = async (key: SecureStorageKeys, value: string): Promise<void> => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.error(`Error saving to secure storage (${key}):`, error);
        throw new Error(`Failed to save ${key} to secure storage`);
    }
};

/**
 * Retrieve a value from secure storage
 */
export const getItem = async (key: SecureStorageKeys): Promise<string | null> => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.error(`Error reading from secure storage (${key}):`, error);
        return null;
    }
};

/**
 * Delete a value from secure storage
 */
export const deleteItem = async (key: SecureStorageKeys): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error(`Error deleting from secure storage (${key}):`, error);
    }
};

/**
 * Save auth tokens
 */
export const saveTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
    await Promise.all([
        setItem(SecureStorageKeys.ACCESS_TOKEN, accessToken),
        setItem(SecureStorageKeys.REFRESH_TOKEN, refreshToken),
    ]);
};

/**
 * Get access token
 */
export const getAccessToken = async (): Promise<string | null> => {
    return getItem(SecureStorageKeys.ACCESS_TOKEN);
};

/**
 * Get refresh token
 */
export const getRefreshToken = async (): Promise<string | null> => {
    return getItem(SecureStorageKeys.REFRESH_TOKEN);
};

/**
 * Clear all auth tokens
 */
export const clearTokens = async (): Promise<void> => {
    await Promise.all([
        deleteItem(SecureStorageKeys.ACCESS_TOKEN),
        deleteItem(SecureStorageKeys.REFRESH_TOKEN),
        deleteItem(SecureStorageKeys.USER_ID),
    ]);
};

/**
 * Check if user is authenticated (has valid token)
 */
export const isAuthenticated = async (): Promise<boolean> => {
    const token = await getAccessToken();
    return token !== null;
};
