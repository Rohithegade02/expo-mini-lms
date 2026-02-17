import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SkeletonProps } from './types';

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = 20,
    borderRadius = 8,
    className = '',
}) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animate = () => {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.7,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]).start(() => animate());
        };

        animate();
    }, [opacity]);

    return (
        <Animated.View
            className={clsx('bg-gray-200', className)}
            style={{
                width,
                height,
                borderRadius,
                opacity,
            }}
        />
    );
};
