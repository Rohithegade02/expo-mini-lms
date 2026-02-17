export const ROUTES = {
    auth: {
        login: '/(auth)/login',
        register: '/(auth)/register',
    },
    tabs: {
        courses: '/(tabs)/courses',
        profile: '/(tabs)/profile',
    },
    courses: {
        details: (id: string) => `/(courses)/${id}`,
        content: (id: string) => `/(courses)/content/${id}`,
    },
} as const;
