export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface LoginRequest {
  email: string;
  password: string;
  role: "admin" | "user";
}

export type LoginResponse = {
  user: User;
  token: string;
} | null;
