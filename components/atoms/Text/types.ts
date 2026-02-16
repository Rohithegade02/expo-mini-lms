import { TextProps as RNTextProps } from 'react-native';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

export interface TextProps extends RNTextProps {
    variant?: TextVariant;
    color?: string;
}

export const variantStyles: Map<TextVariant, string> = new Map([
    ['h1', 'text-4xl font-bold'],
    ['h2', 'text-3xl font-bold'],
    ['h3', 'text-2xl font-semibold'],
    ['body', 'text-base font-normal'],
    ['caption', 'text-sm font-normal'],
    ['label', 'text-sm font-medium'],
]);
