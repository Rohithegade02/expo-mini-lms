import { storage } from '@/lib/storage/mmkv';

// Storage keys
export enum AppStorageKeys {
    LAST_APP_OPEN = 'last_app_open',
    THEME = 'theme',
    LANGUAGE = 'language',
    NOTIFICATION_SETTINGS = 'notification_settings',
}

// Generic get/set helpers
const setItem = <T>(key: AppStorageKeys, value: T): void => {
    try {
        const jsonValue = JSON.stringify(value);
        storage.set(key, jsonValue);
    } catch (error) {
        console.error(`Error saving to MMKV (${key}):`, error);
    }
};

const getItem = <T>(key: AppStorageKeys): T | null => {
    try {
        const jsonValue = storage.getString(key);
        return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error(`Error reading from MMKV (${key}):`, error);
        return null;
    }
};

// Last app open timestamp
export const setLastAppOpen = (timestamp: number): void => {
    setItem(AppStorageKeys.LAST_APP_OPEN, timestamp);
};

export const getLastAppOpen = (): number | null => {
    return getItem<number>(AppStorageKeys.LAST_APP_OPEN);
};

// Theme preferences (migrated from AsyncStorage or just consolidated if new)
// Note: We can expand this with other app-wide settings from async-storage.ts if desired
