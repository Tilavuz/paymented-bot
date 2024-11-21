import { privateInstance } from "./api/client-api";

class UserSirvice {
  async getUsers({
    search,
    isPaid,
    status,
    page,
  }: {
    search?: string;
    isPaid?: string;
    status?: string;
    page?: number;
  }) {
    try {
      const res = await privateInstance.get("/users", {
        params: { search, isPaid, status, page },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getUser(id: string) {
    try {
      const res = await privateInstance.get(`/users/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async changeUser({ id, status }: { id: string; status: string }) {
    try {
      const res = await privateInstance.put(`/users/change_user/${id}`, { status });
      return res.data;
    } catch (error) {
      console.error("Foydalanuvchi statusini o'zgartirishda xatolik:", error);
      throw error;
    }
  }
}
export const userSirvice = new UserSirvice();
