import { defineStore } from "pinia";
import {
  dailySales,
  weeklySales,
  monthlySales,
  yearlySales,
  salesByCategory,
  salesByMarketplace,
  todaySummary,
  monthSummary,
  yearSummary,
} from "@/data/sales";
import { categories } from "@/data/products";

export const useSalesStore = defineStore("sales", {
  state: () => ({
    dailySales,
    weeklySales,
    monthlySales,
    yearlySales,
    salesByCategory,
    salesByMarketplace,
    todaySummary,
    monthSummary,
    yearSummary,
    selectedTimeframe: "monthly",
    selectedCategories: [...Object.keys(salesByCategory)],
    availableCategories: categories,
    isLoading: false,
  }),

  getters: {
    currentSalesData: (state) => {
      switch (state.selectedTimeframe) {
        case "daily":
          return state.dailySales;
        case "weekly":
          return state.weeklySales;
        case "monthly":
          return state.monthlySales;
        case "yearly":
          return state.yearlySales;
        default:
          return state.monthlySales;
      }
    },

    filteredSalesData: (state) => {
      const data = state.currentSalesData;

      // If all categories are selected, return the full data
      if (
        state.selectedCategories.length ===
        Object.keys(state.salesByCategory).length
      ) {
        return data;
      }

      // Otherwise, adjust the values based on selected categories
      const totalRevenue = Object.values(state.salesByCategory).reduce(
        (sum, val) => sum + val,
        0
      );
      const selectedRevenue = state.selectedCategories.reduce(
        (sum, cat) => sum + (state.salesByCategory[cat] || 0),
        0
      );
      const ratio = selectedRevenue / totalRevenue;

      return {
        ...data,
        revenue: data.revenue.map((val) => Math.round(val * ratio)),
        orders: data.orders.map((val) => Math.round(val * ratio)),
        units: data.units.map((val) => Math.round(val * ratio)),
      };
    },

    filteredCategorySales: (state) => {
      const result = {};
      state.selectedCategories.forEach((category) => {
        if (state.salesByCategory[category]) {
          result[category] = state.salesByCategory[category];
        }
      });
      return result;
    },

    totalRevenue: (state) => {
      return Object.values(state.salesByCategory).reduce(
        (total, value) => total + value,
        0
      );
    },

    selectedCategoriesRevenue: (state) => {
      return state.selectedCategories.reduce((total, category) => {
        return total + (state.salesByCategory[category] || 0);
      }, 0);
    },

    categoryPercentages: (state) => {
      const total = state.totalRevenue;
      const result = {};

      Object.entries(state.salesByCategory).forEach(([category, value]) => {
        result[category] = ((value / total) * 100).toFixed(1);
      });

      return result;
    },
  },

  actions: {
    setTimeframe(timeframe) {
      this.selectedTimeframe = timeframe;
    },

    toggleCategory(category) {
      const index = this.selectedCategories.indexOf(category);
      if (index === -1) {
        this.selectedCategories.push(category);
      } else {
        this.selectedCategories.splice(index, 1);
      }
    },

    selectAllCategories() {
      this.selectedCategories = [...Object.keys(this.salesByCategory)];
    },

    deselectAllCategories() {
      this.selectedCategories = [];
    },

    async fetchSalesData() {
      this.isLoading = true;

      try {
        // In a real app, this would be an API call
        // For now, we're just using our static data
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
        return true;
      } catch (error) {
        console.error("Error fetching sales data:", error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
