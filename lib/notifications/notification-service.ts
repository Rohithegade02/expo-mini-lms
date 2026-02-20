import { theme } from '@/constants/theme';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

/**
 * Request permissions for notifications
 */
const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'web') return false;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        return false;
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: theme.light.colors.primary[600],
        });
    }

    return true;
};

/**
 * Schedule a local notification
 */
const scheduleNotification = async (
    title: string,
    body: string,
    data: Record<string, string> = {},
    trigger: Notifications.NotificationTriggerInput = null
): Promise<string> => {
    return await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            data,
            sound: true,
        },
        trigger,
    });
};

/**
 * Cancel all inactivity reminders
 */
const cancelInactivityReminders = async (): Promise<void> => {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const inactivityNotifications = scheduled.filter(
        (n) => (n.content.data as Record<string, string>)?.type === 'inactivity'
    );

    for (const notification of inactivityNotifications) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
};

/**
 * Schedule inactivity reminder (24 hours)
 */
const scheduleInactivityReminder = async (): Promise<string> => {
    // Cancel existing inactivity reminders first
    await cancelInactivityReminders();

    return await scheduleNotification(
        "We miss you! 👋",
        "You haven't checked your courses today. Ready to learn something new?",
        { type: 'inactivity' },
        {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 24 * 60 * 60, // 24 hours
            repeats: false,
        }
    );
};

/**
 * Cancel all scheduled notifications
 */
const cancelAll = async (): Promise<void> => {
    await Notifications.cancelAllScheduledNotificationsAsync();
};

export const notificationService = {
    requestPermissions,
    scheduleNotification,
    scheduleInactivityReminder,
    cancelInactivityReminders,
    cancelAll,
};
