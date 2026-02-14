import api from '@/lib/axios';
import type { LoginCredentials, LoginResponse, AuthUser } from '@/types/auth';

/**
 * Servicio de autenticacion.
 * Consume /api/auth/. Los tokens se manejan via cookies HttpOnly.
 */
export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login/', credentials);
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout/');
  },

  async getMe(): Promise<AuthUser> {
    const { data } = await api.get<AuthUser>('/auth/me/');
    return data;
  },

  async refresh(): Promise<void> {
    await api.post('/auth/refresh/');
  },
};
