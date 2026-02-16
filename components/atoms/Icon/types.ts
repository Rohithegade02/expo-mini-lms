import { ViewProps } from 'react-native';

export type IconLibrary = 'ionicons' | 'material' | 'fontawesome' | 'feather';

export interface IconProps extends Omit<ViewProps, 'children'> {
    name: string;
    size?: number;
    color?: string;
    library?: IconLibrary;
}
