import { ViewProps } from 'react-native';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | number;

export interface AvatarProps extends ViewProps {
    source?: string;
    name?: string;
    size?: AvatarSize;
}
