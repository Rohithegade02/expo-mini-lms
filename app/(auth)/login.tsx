import { LoadingOverlay } from "@/components/atoms";
import { ThemeToggle } from "@/components/molecules";
import React, { Suspense } from 'react';

const LazyLoginScreen = React.lazy(() => import('@/screens/auth/login').then(module => ({ default: module.LoginScreen })))

export default function LoginPage() {
    return (
        <ThemeToggle>
            <Suspense fallback={<LoadingOverlay visible={true} message="Loading..." />}>
                <LazyLoginScreen />
            </Suspense>
        </ThemeToggle>
    );
}
