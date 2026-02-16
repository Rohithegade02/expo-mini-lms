import { ViewProps } from 'react-native';

export interface AvatarProps extends ViewProps {
    source?: string;
    name?: string;
    size?: number;
}
