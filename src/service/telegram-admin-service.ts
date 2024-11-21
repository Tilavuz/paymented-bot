import { privateInstance } from "./api/client-api";

class TelegramAdminService {
  async getTelegramAdmin() {
    try {
      const res = await privateInstance.get("/settings/telegram_admin");
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async changeTelegramAdmin(value: string) {
    try {
      const res = await privateInstance.put("/settings/telegram_admin", {
        value,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const telegramAdminService = new TelegramAdminService();
