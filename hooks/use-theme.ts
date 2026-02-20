import { useThemeStore } from '@/stores/theme-store';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

/**
 * Hook to manage app theme using Zustand store and NativeWind
 */
export const useTheme = () => {
    const { theme, toggleTheme, setTheme } = useThemeStore();
    const { setColorScheme, colorScheme } = useColorScheme();

    useEffect(() => {
        if (theme === 'system') {
            setColorScheme('system');
        } else {
            setColorScheme(theme);
        }
    }, [theme]);

    return {
        theme,
        toggleTheme,
        setTheme,
        isDark: theme === 'dark' || (theme === 'system' && colorScheme === 'dark'),
    };
};
