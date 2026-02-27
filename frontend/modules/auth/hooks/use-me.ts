import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,

    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,

    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 30,   // 30 min
  });
}
