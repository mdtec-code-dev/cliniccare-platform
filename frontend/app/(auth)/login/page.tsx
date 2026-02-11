/**
 * Pagina /login
 * Muestra el formulario de inicio de sesion.
 * Consume POST /api/auth/login/ via LoginForm.
 */

import type { Metadata } from 'next';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Iniciar sesion - Clinicare',
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Clinicare</h1>
        <p className="mt-2 text-sm text-gray-500">
          Inicia sesion para continuar
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
