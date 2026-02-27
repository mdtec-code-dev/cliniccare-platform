"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useMe } from "@/modules/auth/hooks";
import { canAny } from "@/modules/auth/utils/can";

export function RequirePermission({
  permissions,
  children,
}: {
  permissions: string[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: user, isLoading } = useMe();

  useEffect(() => {
    if (!isLoading && user && !canAny(user, permissions)) {
      router.replace("/forbidden");
    }
  }, [user, isLoading, permissions, router]);

  if (isLoading) return null;
  if (!user) return null;

  if (!canAny(user, permissions)) return null;

  return <>{children}</>;
}
