import React, { memo, useMemo } from 'react';
import { Text as RNText } from 'react-native';
import { TextProps, variantStyles } from './types';


export const Text: React.FC<TextProps> = memo(({
    variant = 'body',
    color,
    className = '',
    style,
    ...props
}) => {
    const variantClass = variantStyles.get(variant);
    const colorClass = useMemo(() => color ? `text-[${color}]` : '', [color]);
    const combinedClassName = useMemo(() => `${variantClass} ${colorClass} ${className}`.trim(), [variantClass, colorClass, className]);

    return <RNText className={combinedClassName} style={style} {...props} />;
});
