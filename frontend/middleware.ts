import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware para proteger rutas del sistema clínico.
 * Al usar cookies HttpOnly, el middleware tiene acceso a ellas directamente.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extraemos el access_token de las cookies
  const accessToken = request.cookies.get('access_token')?.value;

  // Rutas que requieren autenticación
  const isDashboardRoute = pathname.startsWith('/dashboard');

  // Rutas de autenticación (para redirigir si ya está logueado)
  const isAuthRoute = pathname.startsWith('/login');

  // CASO 1: Intenta entrar al dashboard sin token
  if (isDashboardRoute && !accessToken) {
    const loginUrl = new URL('/login', request.url);
    // Guardamos la intención original para volver después del login
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // CASO 2: Ya está logueado e intenta ir al login
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

/**
 * Configuración del matcher para que el middleware solo corra en rutas específicas.
 * Optimizamos el performance evitando que corra en assets estáticos o imágenes.
 */
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
