import { Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import clsx from 'clsx';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { MenuItem } from '../types';

interface ProfileMenuItemProps {
    item: MenuItem;
    isLast: boolean;
    isFirst?: boolean;
    testID?: string;
    accessibilityLabel?: string;
}

export const ProfileMenuItem = memo(({ item, isLast, isFirst, testID, accessibilityLabel }: ProfileMenuItemProps) => (
    <Pressable
        onPress={item.onPress}
        className={clsx('flex-row items-center px-4 py-4 bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-700',
            isFirst ? 'rounded-t-3xl border-t mt-6' : '',
            isLast ? 'rounded-b-3xl border-b' : 'border-b border-gray-100 dark:border-gray-700',
            'active:bg-gray-50 dark:active:bg-gray-700 transition-colors shadow-sm')}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
    >
        <View
            className={clsx('p-2 rounded-xl mr-4', item.isDestructive ? 'bg-error-50 dark:bg-error-900/20' : 'bg-primary-50 dark:bg-primary-900/20')}
        >
            <Ionicons
                name={item.icon}
                size={20}
                color={item.isDestructive ? theme.light.colors.error[600] : theme.light.colors.primary[600]}
            />
        </View>

        <Text
            className={clsx('flex-1 font-medium', item.isDestructive ? 'text-error-600 dark:text-error-400' : 'text-gray-800 dark:text-gray-200')}
        >
            {item.label}
        </Text>

        {!item.isDestructive && (
            <Ionicons name="chevron-forward" size={18} color={theme.light.colors.gray[400]} />
        )}
    </Pressable>
));

ProfileMenuItem.displayName = 'ProfileMenuItem';
