import api from "@/lib/axios";
import { User } from "./types";

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export async function register(payload: RegisterPayload) {
  const res = await api.post("auth/register/", payload);
  return res.data;
}

export async function login(payload: LoginPayload) {
  const res = await api.post("auth/login/", payload);
  return res.data;
}

export async function refresh() {
  const res = await api.post("auth/refresh/");
  return res.data;
}

export async function logout() {
  const res = await api.post("auth/logout/");
  return res.data;
}

export async function me(): Promise<User> {
  const res = await api.get("auth/me/");
  return res.data;
}

export async function myRoles() {
  const res = await api.get("auth/me/roles/");
  return res.data;
}

export async function listRoles() {
  const res = await api.get("auth/roles/");
  return res.data;
}

export async function assignRole(payload: { user_id: number; role: string }) {
  const res = await api.post("auth/assign-role/", payload);
  return res.data;
}