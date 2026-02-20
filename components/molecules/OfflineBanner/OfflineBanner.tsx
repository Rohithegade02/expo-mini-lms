import { Icon, Text } from '@/components/atoms';
import { useNetwork } from '@/hooks/use-network';
import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OfflineBannerProps } from './types';

export const OfflineBanner: React.FC<OfflineBannerProps> = memo(
    () => {
        const { isOffline } = useNetwork();
        console.log('isOffline', isOffline);
        const { top, bottom } = useSafeAreaInsets();

        const opacity = useSharedValue(0);
        const scale = useSharedValue(0.95);

        useEffect(() => {
            if (isOffline) {
                opacity.value = withTiming(1, { duration: 250 });
                scale.value = withSpring(1, { damping: 15 });
            } else {
                opacity.value = withTiming(0, { duration: 200 });
                scale.value = withTiming(0.95, { duration: 200 });
            }
        }, [isOffline]);

        const animatedStyle = useAnimatedStyle(() => ({
            opacity: opacity.value,
            transform: [{ scale: scale.value }],
            zIndex: 9999,
        }));

        if (!isOffline) return null;

        return (
            <Animated.View
                style={animatedStyle}
                className="absolute inset-0 bg-error-500 justify-center items-center px-6"
                pointerEvents="auto"
            >
                <View
                    style={{ paddingTop: top, paddingBottom: bottom }}
                    className="items-center"
                >
                    <Icon name="cloud-offline-outline" size={64} color="white" />

                    <Text className="text-white text-xl font-bold mt-6 text-center">
                        You're Offline
                    </Text>

                    <Text className="text-white/90 text-sm text-center mt-2">
                        Please check your internet connection and try again.
                    </Text>
                </View>
            </Animated.View>
        );
    }
);

OfflineBanner.displayName = 'OfflineBanner';