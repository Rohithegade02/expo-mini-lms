import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '../lib/storage/mmkv';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'system',
            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === 'dark' ? 'light' : 'dark',
                })),
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => zustandStorage),
        }
    )
);
