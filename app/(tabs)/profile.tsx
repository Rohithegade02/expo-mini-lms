import { LoadingOverlay } from '@/components/atoms';
import { ThemeToggle } from '@/components/molecules';
import React, { Suspense } from 'react';

const LazyProfileScreen = React.lazy(() => import('@/screens/profile').then(module => ({ default: module.ProfileScreen })))

export default function ProfilePage() {
    return (
        <Suspense fallback={<LoadingOverlay visible={true} message="Loading..." />}>
            <ThemeToggle>
                <LazyProfileScreen />
            </ThemeToggle>
        </Suspense>
    );
}
