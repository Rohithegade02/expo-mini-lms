import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { IconProps } from './types';


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
                return <MaterialIcons name={name as any} size={size} color={color} />;
            case 'fontawesome':
                return <FontAwesome name={name as any} size={size} color={color} />;
            case 'feather':
                return <Feather name={name as any} size={size} color={color} />;
            case 'ionicons':
            default:
                return <Ionicons name={name as any} size={size} color={color} />;
        }
    }, [name, size, color, library]);

    return <View {...props}>{renderIcon()}</View>;
};
