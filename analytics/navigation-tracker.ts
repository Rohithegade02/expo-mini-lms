import { useGlobalSearchParams, usePathname } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect } from "react";
export function NavigationTracker() {
    const posthog = usePostHog();
    const pathname = usePathname();
    const params = useGlobalSearchParams();

    useEffect(() => {
        if (pathname && posthog) {
            posthog.screen(pathname, params);
        }
    }, [pathname, params, posthog]);

    return null;
}