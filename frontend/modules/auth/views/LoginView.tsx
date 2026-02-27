'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginForm } from '../components/LoginForm';
import { useLogin, useMe } from '../hooks';
import { AxiosError } from 'axios';

type ApiError = {
  detail?: string;
};

export function LoginView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const { data: user, isLoading: meLoading } = useMe();
  const loginMutation = useLogin();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!meLoading && user) {
      router.replace(callbackUrl);
    }
  }, [user, meLoading, callbackUrl, router]);

  function handleSubmit() {
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          router.replace(callbackUrl);
        },
      }
    );
  }

  let errorMessage: string | undefined = undefined;

  if (loginMutation.isError) {
    const err = loginMutation.error as AxiosError<ApiError>;
    errorMessage = err.response?.data?.detail ?? 'Credenciales inválidas.';
  }

  if (meLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 via-background to-amber-50">
      <LoginForm
        username={username}
        password={password}
        loading={loginMutation.isPending}
        error={errorMessage}
        showPassword={showPassword}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onTogglePassword={() => setShowPassword(prev => !prev)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
