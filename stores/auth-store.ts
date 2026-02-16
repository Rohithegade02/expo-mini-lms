import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { storage } from '../lib/storage/mmkv-storage';
import * as secureStorage from '../lib/storage/secure-storage';
import type { AuthState, User } from '../types/auth';

interface AuthActions {
    setUser: (user: User | null) => void;
    setToken: (token: string | null, refreshToken: string | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

// MMKV storage adapter for Zustand
const mmkvStorage = {
    getItem: (name: string) => {
        const value = storage.getString(name);
        return value ?? null;
    },
    setItem: (name: string, value: string) => {
        storage.set(name, value);
    },
    removeItem: (name: string) => {
        storage.remove(name);
    },
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            // Initial state
            user: null,
            token: null,
            refreshToken: null,
            isLoading: false,
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
                    await secureStorage.saveTokens(token, refreshToken);
                } else {
                    await secureStorage.clearTokens();
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
                // Clear tokens from secure storage
                await secureStorage.clearTokens();

                // Reset state
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    error: null,
                });
            },

            loadUser: async () => {
                try {
                    set({ isLoading: true });

                    // Load tokens from secure storage
                    const token = await secureStorage.getAccessToken();
                    const refreshToken = await secureStorage.getRefreshToken();

                    if (token && refreshToken) {
                        set({
                            token,
                            refreshToken,
                            isAuthenticated: true
                        });
                    }
                } catch (error) {
                    console.error('Error loading user:', error);
                    set({ error: 'Failed to load user session' });
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => mmkvStorage),
            // Only persist user data, not tokens (tokens are in SecureStore)
            partialize: (state) => ({
                user: state.user,
            }),
        }
    )
);
