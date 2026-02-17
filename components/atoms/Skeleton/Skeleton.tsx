import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    className?: string;
}

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
            className={`bg-gray-200 ${className}`}
            style={{
                width: width as any,
                height: height as any,
                borderRadius,
                opacity,
            }}
        />
    );
};
