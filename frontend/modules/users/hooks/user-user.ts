"use client"

import { useQuery } from "@tanstack/react-query"
import { getUserById } from "../api/users.api"

export function useUser(userId: number) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  })
}
