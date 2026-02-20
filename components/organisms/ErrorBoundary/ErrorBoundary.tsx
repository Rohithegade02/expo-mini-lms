import { Button, Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import React from 'react';
import { FallbackProps, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorBoundaryProps } from './types';

/**
 * Fallback UI to be displayed when a crash occurs
 */
const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <SafeAreaView className="flex-1 bg-white" testID="error-fallback">
            <View className="flex-1 justify-center items-center px-8">
                <View className="bg-error-50 p-6 rounded-full mb-6">
                    <Icon name="alert-circle-outline" size={64} color={theme.light.colors.error[500]} />
                </View>
                <Text variant="h1" className="text-gray-900 mb-2 text-center">
                    Oops! Something went wrong
                </Text>
                <Text variant="body" className="text-gray-500 text-center mb-8">
                    An unexpected error occurred. We've been notified and are looking into it.
                </Text>
                {process.env.NODE_ENV === 'development' && (
                    <Text className="text-error-600 bg-error-50 p-4 rounded-xl text-xs mb-8 font-mono">
                        {JSON.stringify(error)}
                    </Text>
                )}
                <View className="w-full">
                    <Button
                        label="Try Again"
                        onPress={resetErrorBoundary}
                        variant="primary"
                        className="mb-4"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

/**
 * Functional ErrorBoundary component using react-error-boundary
 */
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // Reset any state that would cause the error to re-occur
            }}
            onError={(error, info) => {
                // Log the error to an analytics service here
                console.log('ErrorBoundary caught an error:', error, info);
            }}
        >
            {children}
        </ReactErrorBoundary>
    );
};
