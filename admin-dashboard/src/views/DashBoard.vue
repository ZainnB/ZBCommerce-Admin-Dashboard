<template>
  <div class="dashboard">
    <div class="stats-grid">
      <stat-card
        title="Today's Revenue"
        :value="dashboardStore.stats.revenue.value"
        :change="dashboardStore.stats.revenue.change"
        :chartData="dashboardStore.stats.revenue.data"
        chartColor="#4ade80"
      />

      <stat-card
        title="Today's Orders"
        :value="dashboardStore.stats.orders.value"
        :change="dashboardStore.stats.orders.change"
        :chartData="dashboardStore.stats.orders.data"
        chartColor="#60a5fa"
        format="number"
      />

      <stat-card
        title="Today's Visitors"
        :value="dashboardStore.stats.visitors.value"
        :change="dashboardStore.stats.visitors.change"
        :chartData="dashboardStore.stats.visitors.data"
        chartColor="#f472b6"
        format="number"
      />
    </div>

    <div class="charts-grid">
      <div class="chart-container">
        <div class="chart-header">
          <h3>Sales Analytics</h3>
        </div>
        <div class="chart-content">
          <sales-chart
            v-model="selectedTimeframe"
            :data="dashboardStore.currentSalesData"
            :isLoading="dashboardStore.isLoading"
          />
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-header">
          <h3>Returns</h3>
        </div>
        <div class="chart-content">
          <returns-chart
            :data="dashboardStore.returnsData"
            dateRange="Jan - Jun '23"
            :isLoading="dashboardStore.isLoading"
          />
        </div>
      </div>
    </div>

    <div class="products-section">
      <div class="section-header">
        <h3>Best Selling Products</h3>
      </div>
      <div class="products-table-container">
        <products-table
          :products="dashboardStore.bestSellingProducts"
          @view-all="$router.push('/inventory_management')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDashboardStore } from "@/store";
import StatCard from "@/components/dashboard/StatCard.vue";
import SalesChart from "@/components/dashboard/SalesChart.vue";
import ReturnsChart from "@/components/dashboard/ReturnsChart.vue";
import ProductsTable from "@/components/dashboard/ProductsTable.vue";

const dashboardStore = useDashboardStore();
const selectedTimeframe = ref("monthly");

onMounted(async () => {
  console.log("Dashboard component mounted");
  await dashboardStore.fetchDashboardData();
  console.log("Dashboard data fetched", dashboardStore.dashboardData);
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100%;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.chart-container {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chart-header {
  margin-bottom: 20px;
}

.chart-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.chart-content {
  height: 300px;
}

.products-section {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-header {
  margin-bottom: 20px;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
