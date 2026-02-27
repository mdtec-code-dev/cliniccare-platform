export interface User {
  id: number
  username: string
  email: string
  is_active: boolean
  role: string
}

export interface UsersResponse {
  users: User[]
}
