import { ViewProps } from 'react-native';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning';

export interface BadgeProps extends ViewProps {
    count?: number;
    variant?: BadgeVariant;
    label?: string;
}

export const variantStyles = new Map<BadgeVariant, string>([
    ['primary', 'bg-primary-500'],
    ['secondary', 'bg-secondary-500'],
    ['success', 'bg-success-500'],
    ['error', 'bg-error-500'],
    ['warning', 'bg-warning-500'],
]);
