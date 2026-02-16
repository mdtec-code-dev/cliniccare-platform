'use client';

import { useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/store/use-auth-store';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider - Componente que inicializa el estado global de autenticación
 *
 * Responsabilidades:
 * - Intenta cargar datos del usuario (getMe) cuando la app monta
 * - Solo ejecuta una vez (evita múltiples requests)
 * - Proporciona loading state durante la inicialización
 * - Prepara la app para usar el store de autenticación
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { fetchUser, isLoading, user } = useAuthStore();

  useEffect(() => {
    // Solo intenta cargar el usuario si aún no lo ha hecho
    if (!user && !isLoading) {
      fetchUser();
    }
  }, []); // Empty dependencies = se ejecuta solo una vez

  return <>{children}</>;
}
