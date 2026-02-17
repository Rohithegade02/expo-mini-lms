import { Text } from '@/components/atoms';
import React, { memo } from 'react';
import { View } from 'react-native';

interface ProfileFooterProps {
    version: string;
}

export const ProfileFooter = memo(({ version }: ProfileFooterProps) => (
    <View className="py-8 items-center border-t border-gray-100">
        <Text variant="caption" className="text-gray-400 font-medium">
            Version {version}
        </Text>
    </View>
));

ProfileFooter.displayName = 'ProfileFooter';
