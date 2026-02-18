import { Text } from '@/components/atoms';
import React, { memo } from 'react';
import { View } from 'react-native';
import { CourseProgressProps } from './types';

export const CourseProgress: React.FC<CourseProgressProps> = memo(({ progress }) => {
    return (
        <View className="mt-3">
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <View
                    className="h-2 bg-primary-600"
                    style={{ width: `${progress}%` }}
                />
            </View>
            <Text variant="caption" className="text-gray-500 mt-1">
                {progress}% completed
            </Text>
        </View>
    );
});

CourseProgress.displayName = 'CourseProgress';
