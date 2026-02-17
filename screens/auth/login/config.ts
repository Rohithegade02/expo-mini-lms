
export const FIELD_CONFIG = [
    {
        name: 'username' as const,
        label: 'Username',
        placeholder: 'Enter your username',
        leftIcon: 'person-outline',
        autoCapitalize: 'none' as const,
    },
    {
        name: 'password' as const,
        label: 'Password',
        placeholder: 'Enter your password',
        leftIcon: 'lock-closed-outline',
        isPassword: true,
    },
];