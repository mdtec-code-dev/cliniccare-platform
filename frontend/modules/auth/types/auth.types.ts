export type AuthUser = {
  id: string;
  email: string;
  username: string;
  role?: string;
  
  permissions: string[];
};
