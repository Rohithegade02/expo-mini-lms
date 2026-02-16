import { TextInputProps } from 'react-native';

export interface SearchInputProps extends Omit<TextInputProps, 'onChange'> {
    onSearch: (query: string) => void;
    debounceMs?: number;
}
