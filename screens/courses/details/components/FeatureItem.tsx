import { Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import React, { memo } from 'react';
import { View } from 'react-native';

interface FeatureItemProps {
    isDark: boolean;
    icon: string;
    label: string;
    testID?: string;
    accessibilityLabel?: string;
}

export const FeatureItem = memo(({ isDark, icon, label, testID, accessibilityLabel }: FeatureItemProps) => (
    <View className="flex-row items-center px-6 py-3" testID={testID} accessibilityLabel={accessibilityLabel}>
        <View className="bg-primary-50 dark:bg-primary-900/40 p-2 rounded-lg mr-3">
            <Icon name={icon as any} size={18} color={isDark ? theme.dark.colors.primary[400] : theme.light.colors.primary[600]} />
        </View>
        <Text className="text-gray-700 dark:text-gray-300 font-medium text-sm">
            {label}
        </Text>
    </View>
));

FeatureItem.displayName = 'FeatureItem';
