import { Icon, Text } from '@/components/atoms';
import * as Network from 'expo-network';
import React, { memo, useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OfflineBannerProps } from './types';

export const OfflineBanner: React.FC<OfflineBannerProps> = memo(() => {
    const [isOffline, setIsOffline] = useState(false);
    const translateY = React.useRef(new Animated.Value(-100)).current;
    const { top } = useSafeAreaInsets();

    useEffect(() => {
        const checkNetwork = async () => {
            const state = await Network.getNetworkStateAsync();
            setIsOffline(!state.isConnected);
        };

        const interval = setInterval(checkNetwork, 3000); // Poll every 3 seconds for simplicity

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        Animated.spring(translateY, {
            toValue: isOffline ? top : -100,
            useNativeDriver: true,
            friction: 8,
            tension: 40,
        }).start();
    }, [isOffline, top]);

    if (!isOffline) return null;

    return (
        <Animated.View
            style={{
                transform: [{ translateY }],
                zIndex: 9999,
            }}
            className="absolute left-0 right-0 px-4"
        >
            <View className="bg-red-500 flex-row items-center px-4 py-3 rounded-2xl shadow-lg border border-red-400">
                <Icon name="cloud-offline-outline" size={20} color="white" />
                <View className="ml-3 flex-1">
                    <Text className="text-white font-bold text-sm">Offline Mode</Text>
                    <Text className="text-red-100 text-xs">Some features may be limited</Text>
                </View>
            </View>
        </Animated.View>
    );
});

OfflineBanner.displayName = 'OfflineBanner';
