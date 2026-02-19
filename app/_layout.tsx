import { LoadingOverlay } from '@/components/atoms/LoadingOverlay/LoadingOverlay';
import { OfflineBanner } from '@/components/molecules/OfflineBanner/OfflineBanner';
import { ErrorBoundary } from '@/components/organisms/ErrorBoundary/ErrorBoundary';
import { useAuth } from '@/hooks/use-auth';
import { useNotifications } from '@/hooks/use-notifications';
import { useTheme } from '@/hooks/use-theme';
import { notificationService } from '@/lib/notifications/notification-service';
import * as Sentry from '@sentry/react-native';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { AppState, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

Sentry.init({
  dsn: 'https://3797e3a0d067cd3c03216c0bac17c7bc@o4508366860582912.ingest.us.sentry.io/4510911264391168',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const { isAuthenticated, isLoading, loadUser } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const { isDark } = useTheme(); // Initialize theme sync
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


  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
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
});