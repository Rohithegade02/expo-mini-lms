import { useAuthStore } from '@/stores/auth-store';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';

/**
 * Hook to access auth-related data and actions.
 * Extracts methods from the store to avoid direct store usage in components.
 */
export const useAuth = () => {
    const {
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        authKey
    } = useAuthStore(
        useShallow((state) => ({
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            isLoading: state.isLoading,
            error: state.error,
            authKey: state.authKey,
        }))
    );

    // Get actions (stable references, no need for shallow)
    const setUser = useAuthStore((state) => state.setUser);
    const setToken = useAuthStore((state) => state.setToken);
    const setLoading = useAuthStore((state) => state.setLoading);
    const setError = useAuthStore((state) => state.setError);
    const clearError = useAuthStore((state) => state.clearError);
    const setAuthKey = useAuthStore((state) => state.setAuthKey);
    const login = useAuthStore((state) => state.login);
    const register = useAuthStore((state) => state.register);
    const logout = useAuthStore((state) => state.logout);
    const loadUser = useAuthStore((state) => state.loadUser);
    const refreshProfile = useAuthStore((state) => state.refreshProfile);

    // Helper to check if user has a specific role
    const hasRole = useCallback((role: string) => {
        return user?.role === role;
    }, [user]);

    return {
        // State
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        authKey,

        // Actions
        setUser,
        setToken,
        setLoading,
        setError,
        clearError,
        setAuthKey,
        login,
        register,
        logout,
        loadUser,
        refreshProfile,

        // Helpers
        hasRole
    };
};
