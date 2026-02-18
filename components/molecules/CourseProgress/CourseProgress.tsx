import { Text } from '@/components/atoms';
import React, { memo } from 'react';
import { View } from 'react-native';
import { CourseProgressProps } from './types';

export const CourseProgress: React.FC<CourseProgressProps> = memo(({ progress, testID, accessibilityLabel }) => {
    return (
        <View className="mt-3" testID={testID} accessibilityLabel={accessibilityLabel}>
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <View
                    className="h-2 bg-primary-600"
                    style={{ width: `${progress}%` }}
                    testID={testID ? `${testID}-bar` : undefined}
                />
            </View>
            <Text variant="caption" className="text-gray-500 mt-1">
                {progress}% completed
            </Text>
        </View>
    );
});

CourseProgress.displayName = 'CourseProgress';
