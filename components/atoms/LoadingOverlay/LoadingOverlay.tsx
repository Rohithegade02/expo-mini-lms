import { theme } from '@/constants/theme';
import React, { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '../Text/Text';
import { LoadingOverlayProps } from './types';

export const LoadingOverlay: React.FC<LoadingOverlayProps> = memo(({ visible, message, testID, accessibilityLabel }) => {
    if (!visible) return null;

    return (
        <View
            className="absolute inset-0 bg-black/40 justify-center items-center z-50"
            testID={testID}
            accessibilityLabel={accessibilityLabel}
        >
            <View className="bg-white p-6 rounded-2xl items-center shadow-xl">
                <ActivityIndicator size="large" color={theme.light.colors.primary[600]} />
                {message && (
                    <Text variant="body" className="mt-4 text-gray-900 font-semibold">
                        {message}
                    </Text>
                )}
            </View>
        </View>
    );
});

LoadingOverlay.displayName = 'LoadingOverlay';
