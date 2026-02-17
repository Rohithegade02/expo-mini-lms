import * as SecureStore from 'expo-secure-store';


/**
 * Save a value to secure storage
 */
export const setItem = async (key: string, value: string): Promise<void> => {
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
export const getItem = async (key: string): Promise<string | null> => {
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
export const deleteItem = async (key: string): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error(`Error deleting from secure storage (${key}):`, error);
    }
};
