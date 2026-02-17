import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: string;
    rightIcon?: string;
    isPassword?: boolean;
}
