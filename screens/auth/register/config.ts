export const FIELD_CONFIG = [
    {
        name: 'username' as const,
        label: 'Username',
        placeholder: 'Choose a username',
        leftIcon: 'person-outline',
        autoCapitalize: 'none' as const,
    },
    {
        name: 'email' as const,
        label: 'Email',
        placeholder: 'Enter your email',
        leftIcon: 'mail-outline',
        keyboardType: 'email-address' as const,
        autoCapitalize: 'none' as const,
    },
    {
        name: 'password' as const,
        label: 'Password',
        placeholder: 'Create a password',
        leftIcon: 'lock-closed-outline',
        isPassword: true,
    },
];