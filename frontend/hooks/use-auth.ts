'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/use-auth-store';
import type { LoginCredentials, ApiError } from '@/types/auth';

/**
 * Hook principal para acceder a funcionalidades de autenticación
 * Combina el estado global de Zustand + permisos RBAC
 *
 * @returns Objeto con user data, auth state y métodos
 *
 * @example
 * const { user, isAuthenticated, logout } = useAuth();
 */
export function useAuth() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    logout: storeLogout,
  } = useAuthStore();

  // Estado local para el flujo de login
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const fetchUser = useAuthStore(state => state.fetchUser);

  /**
   * Realiza el login con credenciales
   */
  async function login(credentials: LoginCredentials) {
    setIsLoginLoading(true);
    setLoginError(null);

    try {
      await authService.login(credentials);
      await fetchUser();
      router.push('/dashboard');
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;

      let message: string;
      if (axiosError.code === 'ECONNABORTED') {
        message = 'The server took too long to respond. Please try again.';
      } else if (!axiosError.response) {
        message = 'Failed to connect to the server';
      } else {
        message =
          axiosError.response.data?.detail ?? 'An unexpected error occurred';
      }

      setLoginError(message);
    } finally {
      setIsLoginLoading(false);
    }
  }

  /**
   * Realiza el logout
   */
  async function logout() {
    try {
      await storeLogout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return {
    // Datos del usuario
    user,

    // Estado de la autenticación
    isAuthenticated,
    isLoading,
    isLoginLoading,
    loginError,

    // Metodos
    login,
    logout,
  };
}
