import { Text } from '@/components/atoms';
import React, { memo } from 'react';
import { View } from 'react-native';
import { ProfileFooterProps } from '../types';

// This is the footer component for the profile screen
export const ProfileFooter = memo(({ version, testID, accessibilityLabel }: ProfileFooterProps) => (
    <View className="py-8 items-center border-t border-gray-100 dark:border-gray-800" testID={testID} accessibilityLabel={accessibilityLabel}>
        <Text variant="caption" className="text-gray-400 dark:text-gray-500 font-medium">
            Version {version}
        </Text>
    </View>
));

ProfileFooter.displayName = 'ProfileFooter';
