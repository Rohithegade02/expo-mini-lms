import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Text } from '../../atoms/Text/Text';
import { InstructorInfoProps } from './types';

export const InstructorInfo: React.FC<InstructorInfoProps> = memo(({
    name,
    avatar,
    email,
    className = '',
    ...props
}) => {
    const fullName = useMemo(() => `${name.first} ${name.last}`, [name.first, name.last]);

    return (
        <View className={`flex-row items-center ${className}`} {...props}>
            <Avatar source={avatar} name={fullName} size={32} />
            <View className="ml-2">
                <Text variant="label" className="text-gray-900">
                    {fullName}
                </Text>
                {email && (
                    <Text variant="caption" className="text-gray-500">
                        {email}
                    </Text>
                )}
            </View>
        </View>
    );
});
