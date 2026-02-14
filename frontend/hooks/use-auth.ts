'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { authService } from '@/services/auth.service';
import type { LoginCredentials, ApiError } from '@/types/auth';

/**
 * Hook para manejar el flujo de login.
 * @returns { login, isLoading, error } - Funcion de login, estado de carga y error del servidor.
 */
export function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(credentials: LoginCredentials) {
    setIsLoading(true);
    setError(null);

    try {
      await authService.login(credentials);
      router.push('/dashboard');
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;

      let message: string;
      if (axiosError.code === 'ECONNABORTED') {
        message = 'El servidor tardo demasiado en responder. Intenta de nuevo.';
      } else if (!axiosError.response) {
        message = 'No se pudo conectar con el servidor';
      } else {
        message =
          axiosError.response.data?.detail ?? 'Ocurrio un error inesperado';
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error };
}
