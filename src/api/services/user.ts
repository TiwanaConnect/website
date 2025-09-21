import { LoginRequest, LoginResponse } from "@/common/interface";

const tempUser = [
  {
    id: "1",
    name: "User",
    email: "user@gmail.com",
    password: "123456",
    role: "user",
  },
  {
    id: "2",
    name: "Admin",
    email: "admin@gmail.com",
    password: "123456",
    role: "admin",
  },
];
export class UserService {
  static login(body: LoginRequest): LoginResponse {
    const { email, password, role } = body;
    // return this.post<{ token: string }>("/auth/login", { email, password });
    const user = tempUser.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (!user) {
      return null;
    }
    const token = role === "admin" ? "AdminToken" : "UserToken";
    const data = { name: user.name, email: user.email, id: user.id, role };
    return { user: data, token };
  }
}
