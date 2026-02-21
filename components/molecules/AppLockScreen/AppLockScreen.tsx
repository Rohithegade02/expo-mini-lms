import { theme } from '@/constants/theme';
import React from 'react';
import { Button, StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppLockScreenProps } from './types';

export const AppLockScreen: React.FC<AppLockScreenProps> = ({ isDark, onAuthenticate }) => {
    return (
        <SafeAreaProvider>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
            <View
                className="flex-1 items-center justify-center bg-background p-4"
                style={{ backgroundColor: isDark ? theme.dark.colors.background : theme.light.colors.background }}
            >
                <Text
                    className="text-xl font-bold mb-4 text-foreground"
                    style={{ color: isDark ? theme.dark.colors.white : theme.light.colors.gray[800] }}
                >
                    App Locked
                </Text>
                <Button
                    title="Unlock App"
                    onPress={onAuthenticate}
                />
            </View>
        </SafeAreaProvider>
    );
};
