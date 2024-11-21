import { privateInstance } from "./api/client-api";

class AmountService {
  async getAmount() {
    try {
      const res = await privateInstance.get("/settings/amount");
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async changeAmount(value: number) {
    try {
      const res = await privateInstance.put("/settings/amount", { value });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const amountService = new AmountService();
