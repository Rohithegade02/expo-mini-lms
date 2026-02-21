import { Icon } from '@/components/atoms';
import { theme } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { ThemeToggleProps } from './types';

// This component is used to display a theme toggle
export const ThemeToggle: React.FC<ThemeToggleProps> = memo(({
    children,
    testID = 'theme-toggle-wrapper',
    accessibilityLabel = 'theme-toggle-wrapper'
}) => {
    const { toggleTheme, isDark } = useTheme();

    return (
        <View
            className="flex-1 relative"
            testID={testID}
            accessibilityLabel={accessibilityLabel}
        >
            <View className="absolute top-16 right-6 z-50">
                <Pressable
                    onPress={toggleTheme}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm"
                    testID={`${testID}-button`}
                    accessibilityLabel={`${testID}-button`}
                >
                    <Icon
                        name={isDark ? "sunny" : "moon"}
                        size={24}
                        color={isDark ? theme.light.colors.warning[400] : theme.dark.colors.warning[500]}
                    />
                </Pressable>
            </View>
            {children}
        </View>
    );
});

ThemeToggle.displayName = 'ThemeToggle';
