import { useAuthStore } from '@/stores/auth-store';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';

/**
 * Hook to access auth-related data and actions.
 * Extracts methods from the store to avoid direct store usage in components.
 */
export const useAuth = () => {
    // Select data properties using shallow to prevent unnecessary re-renders
    const {
        user,
        token,
        isAuthenticated,
        isLoading,
        error
    } = useAuthStore(
        useShallow((state) => ({
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            isLoading: state.isLoading,
            error: state.error,
        }))
    );

    // Get actions (stable references, no need for shallow)
    const setUser = useAuthStore((state) => state.setUser);
    const setToken = useAuthStore((state) => state.setToken);
    const setLoading = useAuthStore((state) => state.setLoading);
    const setError = useAuthStore((state) => state.setError);
    const clearError = useAuthStore((state) => state.clearError);
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

        // Actions
        setUser,
        setToken,
        setLoading,
        setError,
        clearError,
        login,
        register,
        logout,
        loadUser,
        refreshProfile,

        // Helpers
        hasRole
    };
};
