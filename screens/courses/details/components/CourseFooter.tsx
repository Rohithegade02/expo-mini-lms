import { Button, Text } from '@/components/atoms';
import React, { memo } from 'react';
import { View } from 'react-native';

interface CourseFooterProps {
    isDark: boolean;
    price: number;
    isEnrolled: boolean;
    isLoading: boolean;
    onEnroll: () => void;
    onViewContent: () => void;
    testID?: string;
    accessibilityLabel?: string;
}

export const CourseFooter = memo(({
    isDark,
    price,
    isEnrolled,
    isLoading,
    onEnroll,
    onViewContent,
    testID,
    accessibilityLabel,
}: CourseFooterProps) => (
    <View className="px-6 pt-6 pb-10 border-t border-gray-200 dark:border-gray-800 mt-6 bg-white dark:bg-gray-900" testID={testID} accessibilityLabel={accessibilityLabel}>

        <View className="mb-4">
            <Text className="text-gray-400 text-xs font-semibold uppercase mb-1">
                Price
            </Text>

            <Text className="text-3xl font-bold text-primary-600">
                ${price.toFixed(2)}
            </Text>
        </View>

        <Button
            label={isEnrolled ? 'View Content' : 'Enroll Now'}
            onPress={isEnrolled ? onViewContent : onEnroll}
            isLoading={isLoading}
            className="rounded-xl"
            variant="primary"
        />
    </View>
));

CourseFooter.displayName = 'CourseFooter';
