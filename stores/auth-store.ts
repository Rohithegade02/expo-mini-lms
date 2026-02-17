import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { authApi } from '../lib/api/auth';
import * as authStorage from '../lib/storage/auth.storage';
import { zustandStorage } from '../lib/storage/mmkv';
import type { AuthState, LoginCredentials, RegisterData, User } from '../types/auth';

interface AuthActions {
    setUser: (user: User | null) => void;
    setToken: (token: string | null, refreshToken: string | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            // Initial state
            user: null,
            token: null,
            refreshToken: null,
            isLoading: true,
            error: null,
            isAuthenticated: false,

            // Actions
            setUser: (user) => {
                set({ user, isAuthenticated: user !== null });
            },

            setToken: async (token, refreshToken) => {
                set({ token, refreshToken, isAuthenticated: token !== null });

                // Save tokens to secure storage
                if (token && refreshToken) {
                    await authStorage.saveTokens(token, refreshToken);
                } else {
                    await authStorage.clearTokens();
                }
            },

            login: async (credentials) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await authApi.login(credentials);
                    const { user, accessToken, refreshToken } = response.data;

                    set({
                        user,
                        token: accessToken,
                        refreshToken,
                        isAuthenticated: true
                    });

                    await authStorage.saveTokens(accessToken, refreshToken);
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : 'Login failed';
                    set({ error: message });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            register: async (data) => {
                try {
                    set({ isLoading: true, error: null });
                    await authApi.register(data);
                    // After registration, user needs to login
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : 'Registration failed';
                    set({ error: message });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            setLoading: (loading) => {
                set({ isLoading: loading });
            },

            setError: (error) => {
                set({ error });
            },

            clearError: () => {
                set({ error: null });
            },

            logout: async () => {
                try {
                    set({ isLoading: true });
                    // Try to call logout API, but clear local regardless
                    await authApi.logout().catch(() => { });
                } finally {
                    await authStorage.clearTokens();
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        isAuthenticated: false,
                        error: null,
                        isLoading: false,
                    });
                }
            },

            loadUser: async () => {
                try {
                    set({ isLoading: true });

                    // Load tokens from secure storage
                    const token = await authStorage.getAccessToken();
                    const refreshToken = await authStorage.getRefreshToken();

                    if (token && refreshToken) {
                        set({
                            token,
                            refreshToken,
                            isAuthenticated: true
                        });

                        // Optionally refresh user data
                        const response = await authApi.getCurrentUser();
                        set({ user: response.data });
                    } else {
                        // No tokens found, user is not authenticated
                        set({
                            isAuthenticated: false,
                            user: null,
                            token: null,
                            refreshToken: null
                        });
                    }
                } catch (error) {
                    console.error('Error loading user:', error);
                    // Clear auth state on error
                    set({
                        isAuthenticated: false,
                        user: null,
                        token: null,
                        refreshToken: null
                    });
                } finally {
                    set({ isLoading: false });
                }
            },

            refreshProfile: async () => {
                try {
                    set({ isLoading: true });
                    const response = await authApi.getCurrentUser();
                    set({ user: response.data });
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : 'Failed to refresh profile';
                    set({ error: message });
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => zustandStorage),
            // Only persist user data, not tokens (tokens are in SecureStore)
            partialize: (state) => ({
                user: state.user,
            }),
        }
    )
);
