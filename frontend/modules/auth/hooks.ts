import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, me, register, LoginPayload, RegisterPayload } from "./api";

export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: me,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.clear();
    },
  });
}
