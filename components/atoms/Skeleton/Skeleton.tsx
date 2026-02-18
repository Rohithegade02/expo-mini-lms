import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SkeletonProps } from './types';

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = 20,
    borderRadius = 8,
    className = '',
    style,
    ...props
}) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );

        loop.start();

        return () => loop.stop();
    }, [opacity]);

    return (
        <Animated.View
            className={clsx('bg-gray-200 overflow-hidden', className)}
            style={[{ width, height, borderRadius, opacity }, style]}
            {...props}
        />
    );
};
