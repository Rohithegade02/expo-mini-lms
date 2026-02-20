import { theme } from '@/constants/theme';
import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { ComponentProps, useCallback } from 'react';
import { View } from 'react-native';
import { IconProps } from './types';

export type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
export type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];
export type FeatherIconName = ComponentProps<typeof Feather>['name'];
export type IoniconsIconName = ComponentProps<typeof Ionicons>['name'];


export const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    color = theme.light.colors.text,
    library = 'ionicons',
    ...props
}) => {
    const renderIcon = useCallback(() => {
        switch (library) {
            case 'material':
                return <MaterialIcons name={name as MaterialIconName} size={size} color={color} />;
            case 'fontawesome':
                return <FontAwesome name={name as FontAwesomeIconName} size={size} color={color} />;
            case 'feather':
                return <Feather name={name as FeatherIconName} size={size} color={color} />;
            case 'ionicons':
            default:
                return <Ionicons name={name as IoniconsIconName} size={size} color={color} />;
        }
    }, [name, size, color, library]);

    return <View {...props}>{renderIcon()}</View>;
};
