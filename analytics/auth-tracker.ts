import { useAuth } from "@/hooks/use-auth";
import { usePostHog } from "posthog-react-native";
import { useEffect } from "react";

// This component is used to track authentication events
export function AuthAnalyticsTracker() {
    const posthog = usePostHog();
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!posthog) return;

        if (isAuthenticated && user) {
            posthog.identify(user.id, {
                email: user.email,
                username: user.username,
                role: user.role || 'USER',
            });
        } else if (!isAuthenticated) {
            posthog.reset();
        }
    }, [isAuthenticated, user, posthog]);

    return null;
}   