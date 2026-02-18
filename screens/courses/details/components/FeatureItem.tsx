import { Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import React, { memo } from 'react';
import { View } from 'react-native';

interface FeatureItemProps {
    icon: string;
    label: string;
}

export const FeatureItem = memo(({ icon, label }: FeatureItemProps) => (
    <View className="flex-row items-center px-6 py-3">
        <View className="bg-primary-50 p-2 rounded-lg mr-3">
            <Icon name={icon as any} size={18} color={theme.light.colors.primary[600]} />
        </View>
        <Text className="text-gray-700 font-medium text-sm">
            {label}
        </Text>
    </View>
));

FeatureItem.displayName = 'FeatureItem';
