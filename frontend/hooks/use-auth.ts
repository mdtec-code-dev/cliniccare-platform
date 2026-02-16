"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { useLogin, useLogout, useMe } from "@/modules/auth/hooks";

type ApiError = {
  detail?: string;
};

export function useAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const meQuery = useMe();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  function login(credentials: { username: string; password: string }) {
    loginMutation.mutate(credentials, {
      onSuccess: () => {
        router.replace(callbackUrl);
      },
    });
  }

  function logout() {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace("/login");
      },
    });
  }

  // Error handling estilo tu dev
  let loginError: string | null = null;

  if (loginMutation.isError) {
    const err = loginMutation.error as AxiosError<ApiError>;

    if (err.code === "ECONNABORTED") {
      loginError = "El servidor tardó demasiado. Intenta nuevamente.";
    } else if (!err.response) {
      loginError = "No se pudo conectar con el servidor.";
    } else {
      loginError = err.response.data?.detail ?? "Credenciales inválidas.";
    }
  }

  return {
    user: meQuery.data ?? null,
    isAuthenticated: !!meQuery.data,
    isLoading: meQuery.isLoading,

    isLoginLoading: loginMutation.isPending,
    loginError,

    login,
    logout,
  };
}
