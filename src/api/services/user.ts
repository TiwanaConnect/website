import AbstractApi from "@/api/AbstractApi";

interface LoginResponse {
  isOk: boolean;
  token?: string;
}

export class UserService extends AbstractApi {
  private tempUser = [
    {
      id: "1",
      email: "user@gmail.com",
      password: "123456",
      role: "user",
    },
    {
      id: "2",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin",
    },
  ];

  login(
    email: string,
    password: string,
    role: "admin" | "user"
  ): LoginResponse {
    // return this.post<{ token: string }>("/auth/login", { email, password });
    const user = this.tempUser.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (!user) {
      return {
        isOk: false,
      };
    }
    const token = role === "admin" ? "AdminToken" : "UserToken";
    return { isOk: true, token };
  }

  getProfile() {
    return this.get<{ id: string; email: string; name: string }>("/users/me");
  }

  getAll() {
    return this.get<{ id: string; email: string; name: string }>("/users/me");
  }
}
