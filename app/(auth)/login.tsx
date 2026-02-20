import { LoadingOverlay } from "@/components/atoms";
import { ThemeToggle } from "@/components/molecules";
import React, { Suspense } from 'react';

const LazyLoginScreen = React.lazy(() => import('@/screens/auth/login').then(module => ({ default: module.LoginScreen })))

export default function LoginPage() {
    return (
        <Suspense fallback={<LoadingOverlay visible={true} message="Loading..." />}>
            <ThemeToggle>
                <LazyLoginScreen />
            </ThemeToggle>
        </Suspense>
    );
}
