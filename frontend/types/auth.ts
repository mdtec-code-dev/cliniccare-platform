/** Credenciales para POST /api/auth/login/ */
export interface LoginCredentials {
  username: string;
  password: string;
}

/** Respuesta exitosa de POST /api/auth/login/ */
export interface LoginResponse {
  access?: string;
  refresh?: string;
  message?: string;
}

/** Respuesta de GET /api/auth/me/ */
export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

/** Roles de usuario disponibles */
export type UserRole = 'admin' | 'doctor' | 'receptionist';

/** Estructura de error de la API (DRF) */
export interface ApiError {
  detail?: string;
  [field: string]: string | string[] | undefined;
}
