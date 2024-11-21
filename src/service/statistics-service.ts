import { privateInstance } from "./api/client-api";

class StatisticsService {
  async getStatistics() {
    try {
      const res = await privateInstance.get("/dashboard/statistics");
      return res.data
    } catch (error) {
      throw error;
    }
  }
}

export const statisticsService = new StatisticsService();
