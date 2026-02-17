import { Text } from '@/components/atoms';
import React, { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface LoadingOverlayProps {
    visible: boolean;
    message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = memo(({ visible, message }) => {
    if (!visible) return null;

    return (
        <View
            className="absolute inset-0 bg-black/40 justify-center items-center"
            style={{ zIndex: 99999 }}
        >
            <View className="bg-white p-6 rounded-2xl items-center shadow-xl">
                <ActivityIndicator size="large" color="#2563eb" />
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
