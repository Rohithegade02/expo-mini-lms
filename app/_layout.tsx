import { LoadingOverlay } from '@/components/atoms/LoadingOverlay/LoadingOverlay';
import { OfflineBanner } from '@/components/molecules/OfflineBanner/OfflineBanner';
import { ErrorBoundary } from '@/components/organisms';
import { useAuth } from '@/hooks/use-auth';
import { useBiometrics } from '@/hooks/use-biometrics';
import useNetwork from '@/hooks/use-network';
import { useNotifications } from '@/hooks/use-notifications';
import { useTheme } from '@/hooks/use-theme';
import { notificationService } from '@/lib/notifications/notification-service';
import * as Sentry from '@sentry/react-native';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { AppState, Button, StatusBar, Text, View } from 'react-native';
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
  const { isDark } = useTheme();
  const { isOffline } = useNetwork();
  console.log('isOffline', isOffline);

  const {
    isEnrolled,
    isBiometricAuthenticated,
    authenticate,
    isLoading: isBiometricsLoading,
    isHardwareSupported
  } = useBiometrics({
    auto: true,
    reason: 'Authenticate to access the app'
  });

  useNotifications();

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

  // Wait for initial auth check and biometrics check if potentially relevant
  const appIsLoading = isLoading || (!isReady) || (isAuthenticated && isBiometricsLoading);

  if (appIsLoading) {
    return <LoadingOverlay visible={true} message="Loading..." />;
  }

  // App Lock Logic:
  // If user is logged in AND has biometrics enabled/available AND hasn't passed bio-check
  const shouldLock = isAuthenticated && isHardwareSupported && isEnrolled && !isBiometricAuthenticated;

  if (shouldLock) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <View className="flex-1 items-center justify-center bg-background p-4" style={{ backgroundColor: isDark ? '#000' : '#fff' }}>
          <Text className="text-xl font-bold mb-4 text-foreground" style={{ color: isDark ? '#fff' : '#000' }}>
            App Locked
          </Text>
          <Button
            title="Unlock App"
            onPress={() => authenticate()}
          />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <Stack>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(courses)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
        <OfflineBanner />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
});