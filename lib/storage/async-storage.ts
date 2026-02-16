import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export enum AsyncStorageKeys {
    THEME = 'theme',
    LANGUAGE = 'language',
    NOTIFICATION_SETTINGS = 'notification_settings',
}

/**
 * Save a value to AsyncStorage
 */
export const set = async <T>(key: AsyncStorageKeys, value: T): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error(`Error saving to AsyncStorage (${key}):`, error);
    }
};

/**
 * Get a value from AsyncStorage
 */
export const get = async <T>(key: AsyncStorageKeys): Promise<T | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error(`Error reading from AsyncStorage (${key}):`, error);
        return null;
    }
};

/**
 * Delete a value from AsyncStorage
 */
export const deleteItem = async (key: AsyncStorageKeys): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`Error deleting from AsyncStorage (${key}):`, error);
    }
};

/**
 * Clear all AsyncStorage
 */
export const clearAll = async (): Promise<void> => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
    }
};
