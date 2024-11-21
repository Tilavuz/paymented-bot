import { privateInstance } from "./api/client-api";

class AuthService {
  async login({ username, password }: { username: string; password: string }) {
    try {
      const res = await privateInstance.post("/login", { username, password });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async checkAuth() {
    try {
      const res = await privateInstance.get("/check_auth");
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async changeAuth({
    auth: { username, password },
    id,
  }: {
    auth: {
      username: string;
      password: string;
    };
    id: string;
  }) {
    try {
      const res = await privateInstance.put(`/settings/auth/${id}`, {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
export const authService = new AuthService();
