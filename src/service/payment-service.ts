import { privateInstance } from "./api/client-api";

class PaymentService {
  async deletePayment(id: string) {
    try {
      const response = await privateInstance.delete(`/payment_delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting payment:", error);
      throw new Error("Failed to delete payment");
    }
  }

  async approvePayment(id: string) {
    try {
      const response = await privateInstance.put(`/approve_payment/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error approving payment:", error);
      throw new Error("Failed to approve payment");
    }
  }

  async denyPayment(id: string) {
    try {
      const response = await privateInstance.put(`/deny_payment/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error denying payment:", error);
      throw new Error("Failed to deny payment");
    }
  }

  async getUnseenPaymentsCount() {
    try {
      const response = await privateInstance.get("/payments/unseen-count");
      return response.data;
    } catch (error) {
      console.error("Error fetching unseen payments count:", error);
      throw new Error("Failed to fetch unseen payments count");
    }
  }
}

export const paymentService = new PaymentService();
