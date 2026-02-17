import { useAuthStore } from '@/stores/auth-store';
import { Stack, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import '../global.css';

export default function RootLayout() {
  const { isAuthenticated, isLoading, loadUser } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname()

  useEffect(() => {
    loadUser();
    setIsReady(true);
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="small" color="#2563eb" />
      </View>
    );
  }

  console.log(isAuthenticated, 'isAuthenticated', isLoading, 'isLoading', pathname);

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(courses)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </React.Fragment>
  );
}