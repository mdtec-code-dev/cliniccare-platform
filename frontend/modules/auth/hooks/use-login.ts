import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async () => {
      // refresca el usuario inmediatamente
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}
