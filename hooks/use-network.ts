import * as Network from 'expo-network';
import { useEffect, useState } from 'react';

export const useNetwork = () => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        // Initial check
        const checkNetwork = async () => {
            const state = await Network.getNetworkStateAsync();
            setIsOffline(state.isConnected === false || state.isInternetReachable === false);
        };
        checkNetwork();

        // Subscribe to real-time events natively
        const subscription = Network.addNetworkStateListener((state) => {
            setIsOffline(state.isConnected === false || state.isInternetReachable === false);
        });

        return () => subscription.remove();
    }, []);

    return { isOffline };
};

export default useNetwork;
