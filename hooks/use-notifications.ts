import { ROUTES } from '@/constants/router';
import * as Notifications from 'expo-notifications';
import { RelativePathString, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { notificationService } from '../lib/notifications/notification-service';

export const useNotifications = () => {
    const router = useRouter();
    const notificationListener = useRef<Notifications.EventSubscription>(null);
    const responseListener = useRef<Notifications.EventSubscription>(null);

    useEffect(() => {
        // Request permissions on mount
        notificationService.requestPermissions();

        // Listener for when a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        });

        // Listener for when a user interacts with a notification (taps it)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            const data = response.notification.request.content.data;

            // Handle navigation based on notification data
            if (data?.type === 'course' && data?.courseId) {
                router.push(ROUTES.courses.details(data.courseId as string) as RelativePathString);
            } else if (data?.type === 'bookmarks') {
                router.push(ROUTES.tabs.courses as RelativePathString);
            }
        });

        return () => {
            if (notificationListener.current) {
                notificationListener.current.remove();
            }
            if (responseListener.current) {
                responseListener.current.remove();
            }
        };
    }, []);

    return {
        scheduleNotification: notificationService.scheduleNotification,
        cancelAll: notificationService.cancelAll,
    };
};
