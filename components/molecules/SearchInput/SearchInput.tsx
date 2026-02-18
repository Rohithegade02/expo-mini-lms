import { Icon } from '@/components/atoms';
import { theme } from '@/constants/theme';
import clsx from 'clsx';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { SearchInputProps } from './types';

export const SearchInput: React.FC<SearchInputProps> = memo(({
    onSearch,
    debounceMs = 300,
    placeholder = 'Search...',
    className = '',
    ...props
}) => {
    const [value, setValue] = useState('');
    const onSearchRef = useRef(onSearch);

    // Update ref when onSearch changes to avoid stale closures
    useEffect(() => {
        onSearchRef.current = onSearch;
    }, [onSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchRef.current(value);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [value, debounceMs]);

    const handleClear = useCallback(() => {
        setValue('');
    }, []);

    return (
        <View className={clsx('flex-row items-center bg-gray-100 rounded-lg px-4 py-2', className)}>
            <Icon name="search" size={20} color={theme.light.colors.gray[500]} library="ionicons" />
            <TextInput
                className="flex-1 ml-2 text-base text-gray-900"
                placeholder={placeholder}
                placeholderTextColor={theme.light.colors.gray[400]}
                value={value}
                onChangeText={setValue}
                {...props}
            />
            {value.length > 0 && (
                <Pressable onPress={handleClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Icon
                        name="close-circle"
                        size={20}
                        color={theme.light.colors.gray[500]}
                        library="ionicons"
                    />
                </Pressable>
            )}
        </View>
    );
});
