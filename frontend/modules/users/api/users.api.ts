import api from "@/lib/api/api";
import type { User, UsersResponse } from "../types/user.types"



export async function createUser(payload: {
  username: string
  email?: string
  password: string
}) {
  const res = await api.post("/auth/register/", payload)
  return res.data
}



export async function getUsers(): Promise<User[]> {
  const response = await api.get<UsersResponse>("/auth/users/");
  return response.data.users
}


export async function getUserById(userId: number): Promise<User> {
    const response = await api.get<User>(`/auth/users/${userId}/`);
    return response.data;
}


export async function assignRole(userId: number, role: string) {
  const res = await api.post("/auth/assign-role/", {
    user_id: userId,
    role,
  })

  return res.data
}

export async function updateUserStatus(userId: number, isActive: boolean) {
  const res = await api.patch(`/auth/users/${userId}/status/`, {
    is_active: isActive,
  });

  return res.data;
}

export async function deactivateUser(userId: number) {
  return updateUserStatus(userId, false);
}

export async function activateUser(userId: number) {
  return updateUserStatus(userId, true);
}