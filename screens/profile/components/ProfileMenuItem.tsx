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
}

export const ProfileMenuItem = memo(({ item, isLast, isFirst }: ProfileMenuItemProps) => (
    <Pressable
        onPress={item.onPress}
        className={clsx('flex-row items-center px-4 py-4 bg-white border-x border-gray-200',
            isFirst ? 'rounded-t-3xl border-t mt-6' : '',
            isLast ? 'rounded-b-3xl border-b' : 'border-b border-gray-100',
            'active:bg-gray-50 transition-colors shadow-sm')}
        style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            backgroundColor: pressed ? '#f9fafb' : 'white'
        })}
    >
        <View
            className={clsx('p-2 rounded-xl mr-4', item.isDestructive ? 'bg-error-50' : 'bg-primary-50')}
        >
            <Ionicons
                name={item.icon}
                size={20}
                color={item.isDestructive ? theme.light.colors.error[600] : theme.light.colors.primary[600]}
            />
        </View>

        <Text
            className={clsx('flex-1 font-medium', item.isDestructive ? 'text-error-600' : 'text-gray-800')}
        >
            {item.label}
        </Text>

        {!item.isDestructive && (
            <Ionicons name="chevron-forward" size={18} color={theme.light.colors.gray[400]} />
        )}
    </Pressable>
));

ProfileMenuItem.displayName = 'ProfileMenuItem';
