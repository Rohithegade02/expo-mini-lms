import { Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import clsx from 'clsx';
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { CourseStatsProps } from './types';
export const CourseStats: React.FC<CourseStatsProps> = memo(({
    rating,
    price,
    className = '',
    ...props
}) => {
    const formattedRating = useMemo(() =>
        rating !== undefined ? rating.toFixed(1) : null,
        [rating]
    );

    const formattedPrice = useMemo(() =>
        price !== undefined ? `$${price.toFixed(2)}` : null,
        [price]
    );

    return (
        <View className={clsx('flex-row items-center', className)} {...props}>
            {formattedRating && (
                <View className="flex-row items-center mr-4">
                    <Icon name="star" size={16} color={theme.light.colors.warning[500]} library="ionicons" />
                    <Text variant="caption" className="ml-1 text-gray-700">
                        {formattedRating}
                    </Text>
                </View>
            )}
            {formattedPrice && (
                <View className="flex-row items-center">
                    <Icon name="pricetag" size={16} color={theme.light.colors.success[500]} library="ionicons" />
                    <Text variant="caption" className="ml-1 text-gray-700 font-semibold">
                        {formattedPrice}
                    </Text>
                </View>
            )}
        </View>
    );
});
