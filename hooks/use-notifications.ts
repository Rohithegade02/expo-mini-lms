import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
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
            console.log('Notification received:', notification);
        });

        // Listener for when a user interacts with a notification (taps it)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            const data = response.notification.request.content.data;
            console.log('Notification response received:', data);

            // Handle navigation based on notification data
            if (data?.type === 'course' && data?.courseId) {
                router.push(`/(courses)/${data.courseId}` as any);
            } else if (data?.type === 'bookmarks') {
                router.push('/(tabs)/courses' as any);
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
