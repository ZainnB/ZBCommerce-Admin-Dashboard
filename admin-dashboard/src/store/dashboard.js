import { defineStore } from "pinia";
import {
  dashboardStats,
  salesAnalytics,
  returnsData,
  bestSellingProducts,
} from "@/data/dashboard";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    stats: dashboardStats,
    salesAnalytics,
    returnsData,
    bestSellingProducts,
    selectedTimeframe: "monthly",
    isLoading: false,
  }),

  getters: {
    currentSalesData: (state) => {
      return state.salesAnalytics[state.selectedTimeframe];
    },
  },

  actions: {
    setTimeframe(timeframe) {
      this.selectedTimeframe = timeframe;
    },

    async fetchDashboardData() {
      this.isLoading = true;

      try {
        // In a real app, this would be an API call
        // For now, we're just using our static data
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
        return true;
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
