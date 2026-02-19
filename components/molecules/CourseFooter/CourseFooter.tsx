import { Text } from '@/components/atoms';
import React, { memo } from 'react';
import { View } from 'react-native';
import { CourseFooterProps } from './types';

export const CourseFooter: React.FC<CourseFooterProps> = memo(({ price, testID, accessibilityLabel }) => {
    return (
        <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700" testID={testID} accessibilityLabel={accessibilityLabel}>
            <Text variant="h3" className="text-primary-600 dark:text-primary-400 font-bold">
                ${price.toFixed(2)}
            </Text>
        </View>
    );
});

CourseFooter.displayName = 'CourseFooter';
