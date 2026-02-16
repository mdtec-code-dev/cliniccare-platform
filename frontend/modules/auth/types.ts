export type UserRole = "ADMIN" | "RECEPTIONIST" | "DOCTOR";

export type User = {
  id: number;
  username: string;
  email: string;
  role: UserRole | null;
  permissions: string[];  
};
