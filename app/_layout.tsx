import { LoadingOverlay } from '@/components/atoms/LoadingOverlay/LoadingOverlay';
import { OfflineBanner } from '@/components/molecules/OfflineBanner/OfflineBanner';
import { ErrorBoundary } from '@/components/organisms/ErrorBoundary/ErrorBoundary';
import { useAuth } from '@/hooks/use-auth';
import { useNotifications } from '@/hooks/use-notifications';
import { notificationService } from '@/lib/notifications/notification-service';
import { Stack, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { AppState, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export default function RootLayout() {
  const { isAuthenticated, isLoading, loadUser } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname()
  useNotifications(); // Initialize notifications

  useEffect(() => {
    loadUser();
    setIsReady(true);

    // App State listener for inactivity reminders
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        notificationService.scheduleInactivityReminder();
      } else if (nextAppState === 'active') {
        notificationService.cancelInactivityReminders();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Loading state handling is now done via LoadingOverlay in return
  // But we still want to block initial load if not ready
  if (!isReady) return null;

  console.log(isAuthenticated, 'isAuthenticated', isLoading, 'isLoading', pathname);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <OfflineBanner />
        <LoadingOverlay visible={isLoading} message="Loading..." />
        <Stack>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(courses)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}