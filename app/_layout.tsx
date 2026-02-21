import { AuthAnalyticsTracker, NavigationTracker } from '@/analytics';
import { LoadingOverlay } from '@/components/atoms';
import { AppLockScreen, OfflineBanner } from '@/components/molecules';
import { ErrorBoundary } from '@/components/organisms';
import { useAuth } from '@/hooks/use-auth';
import { useBiometrics } from '@/hooks/use-biometrics';
import { useNotifications } from '@/hooks/use-notifications';
import { useTheme } from '@/hooks/use-theme';
import { notificationService } from '@/lib/notifications/notification-service';
import { listenForSslPinningErrors, setupSslPinning } from '@/lib/security/ssl-pinning';
import * as Sentry from '@sentry/react-native';
import { Stack } from 'expo-router';
import { PostHogProvider } from 'posthog-react-native';
import React, { useEffect, useState } from 'react';
import { AppState, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

// Sentry setup
Sentry.init({
  dsn: 'https://3797e3a0d067cd3c03216c0bac17c7bc@o4508366860582912.ingest.us.sentry.io/4510911264391168',
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

export default Sentry.wrap(function RootLayout() {
  const { isAuthenticated, isLoading, loadUser, authKey, setAuthKey } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const { isDark } = useTheme();

  const {
    isEnrolled,
    isBiometricAuthenticated,
    authenticate,
    isLoading: isBiometricsLoading,
    isHardwareSupported
  } = useBiometrics({
    auto: !authKey,
    reason: 'Authenticate to access the app',
    onSuccess: () => {
      setAuthKey(true);
    }
  });

  useNotifications();

  useEffect(() => {
    // Initialize SSL Public Key Pinning first — before any network requests
    setupSslPinning().catch((err) =>
      console.error('[SSL Pinning] Initialization failed:', err)
    );

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

    // SSL pinning failure listener — logs & could report to Sentry
    const sslSubscription = listenForSslPinningErrors((hostname) => {
      console.error(`[SSL Pinning] Blocked connection to: ${hostname}`);
    });

    return () => {
      subscription.remove();
      sslSubscription.remove();
    };
  }, []);

  // Wait for initial auth check and biometrics check if potentially relevant
  const appIsLoading = isLoading || (!isReady) || (isAuthenticated && !authKey && isBiometricsLoading);

  if (appIsLoading) {
    return <LoadingOverlay visible={true} message="Loading..." />;
  }

  // App Lock Logic:
  // If user is logged in AND has biometrics enabled/available AND hasn't passed bio-check AND not already permanently unlocked
  const shouldLock = isAuthenticated && isHardwareSupported && isEnrolled && !isBiometricAuthenticated && !authKey;

  if (shouldLock) {
    return <AppLockScreen isDark={isDark} onAuthenticate={authenticate} />;
  }

  return (
    <PostHogProvider apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
      options={{
        host: 'https://us.i.posthog.com',
        enableSessionReplay: true,
        sessionReplayConfig: {
          maskAllTextInputs: true,
          maskAllImages: true,
        },
      }}
      autocapture={{
        captureTouches: true,
        captureScreens: false,
      }}
    >

      <ErrorBoundary>
        <SafeAreaProvider>
          <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
          <NavigationTracker />
          <AuthAnalyticsTracker />
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
    </PostHogProvider>
  );
});


