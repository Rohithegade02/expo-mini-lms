export interface Avatar {
    url: string;
    localPath: string;
    _id: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    avatar?: Avatar | string;
    name?: {
        first: string;
        last: string;
    };
    role?: 'ADMIN' | 'USER';
}

export interface LoginCredentials {
    username: string;
    password: string;
    email?: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'USER';
}

export interface AuthResponse {
    statusCode: number;
    data: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
    message: string;
    success: boolean;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}
