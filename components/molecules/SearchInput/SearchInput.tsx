import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from '../../atoms/Icon/Icon';
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
        <View className={`flex-row items-center bg-gray-100 rounded-lg px-4 py-2 ${className}`}>
            <Icon name="search" size={20} color="#6b7280" library="ionicons" />
            <TextInput
                className="flex-1 ml-2 text-base"
                placeholder={placeholder}
                placeholderTextColor="#9ca3af"
                value={value}
                onChangeText={setValue}
                {...props}
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={handleClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Icon
                        name="close-circle"
                        size={20}
                        color="#6b7280"
                        library="ionicons"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
});
