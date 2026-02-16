import { ViewProps } from 'react-native';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning';

export interface BadgeProps extends ViewProps {
    count?: number;
    variant?: BadgeVariant;
    label?: string;
}

export const variantStyles = new Map<BadgeVariant, string>([
    ['primary', 'bg-blue-500'],
    ['secondary', 'bg-gray-500'],
    ['success', 'bg-green-500'],
    ['error', 'bg-red-500'],
    ['warning', 'bg-yellow-500'],
]);
