import clsx from 'clsx';
import React, { memo } from 'react';
import { View } from 'react-native';
import { Text } from '../Text/Text';
import { BadgeProps, variantStyles } from './types';


export const Badge: React.FC<BadgeProps> = memo(({
    count,
    variant = 'primary',
    label,
    className = '',
    ...props
}) => {
    const variantClass = variantStyles.get(variant);
    const displayText = label || (count !== undefined ? count.toString() : '');

    if (!displayText) return null;

    return (
        <View
            className={clsx('px-2 py-1 rounded-full', variantClass, className)}
            {...props}
        >
            <Text variant="caption" className="text-white font-semibold">
                {displayText}
            </Text>
        </View>
    );
});
