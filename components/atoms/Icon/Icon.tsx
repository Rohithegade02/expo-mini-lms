import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { ComponentProps, useCallback } from 'react';
import { View } from 'react-native';
import { IconProps } from './types';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];
type FeatherIconName = ComponentProps<typeof Feather>['name'];
type IoniconsIconName = ComponentProps<typeof Ionicons>['name'];


export const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    color = '#000',
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
