import { create } from 'zustand';
import { authService } from '@/services/auth.service';
import type { AuthUser } from '@/types/auth';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;

  // Actions
  setUser: (user: AuthUser | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isLoggingOut: false,

  setUser: user =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      isLoggingOut: false,
    }),

  fetchUser: async () => {
    set({ isLoading: true, isLoggingOut: false });
    try {
      const user = await authService.getMe();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await authService.logout();
    } finally {
      // MANTENEMOS isLoggingOut: true.
      // Esto actúa como un escudo que impide que el Dashboard intente
      // hacer un fetchUser() automático mientras redirigimos.
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isLoggingOut: true,
      });
    }
  },

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isLoggingOut: false,
    }),
}));
