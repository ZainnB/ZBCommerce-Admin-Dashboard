<template>
  <div class="revenue-analysis">
    <div class="page-header">
      <h2>Revenue Analysis</h2>
      <div class="header-actions">
        <button
          class="refresh-btn"
          @click="refreshData"
          :disabled="salesStore.isLoading"
        >
          <refresh-cw-icon size="18" />
          Refresh Data
        </button>
      </div>
    </div>

    <div class="stats-grid">
      <stat-card
        title="Today's Revenue"
        :value="salesStore.todaySummary.revenue"
        format="currency"
        :comparison="4.8"
      />

      <stat-card
        title="Today's Orders"
        :value="salesStore.todaySummary.orders"
        format="number"
        :comparison="-3.5"
      />

      <stat-card
        title="Average Order Value"
        :value="salesStore.todaySummary.averageOrderValue"
        format="currency"
        :comparison="3.1"
      />
    </div>

    <div class="chart-container">
      <div class="chart-header">
        <h3>Revenue Trends</h3>
        <div class="chart-controls">
          <time-filter v-model="selectedTimeframe" />
        </div>
      </div>

      <div class="chart-content">
        <line-chart
          :data="{
            labels: salesStore.filteredSalesData.labels,
            values: salesStore.filteredSalesData.revenue,
          }"
          title="Revenue"
          color="#4ade80"
          :isLoading="salesStore.isLoading"
        />
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-container">
        <div class="chart-header">
          <h3>Orders</h3>
        </div>
        <div class="chart-content">
          <line-chart
            :data="{
              labels: salesStore.filteredSalesData.labels,
              values: salesStore.filteredSalesData.orders,
            }"
            title="Orders"
            color="#60a5fa"
            :isLoading="salesStore.isLoading"
          />
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-header">
          <h3>Units Sold</h3>
        </div>
        <div class="chart-content">
          <line-chart
            :data="{
              labels: salesStore.filteredSalesData.labels,
              values: salesStore.filteredSalesData.units,
            }"
            title="Units"
            color="#f472b6"
            :isLoading="salesStore.isLoading"
          />
        </div>
      </div>
    </div>

    <div class="category-section">
      <div class="section-header">
        <h3>Revenue by Category</h3>
      </div>

      <div class="category-grid">
        <div class="category-filters">
          <category-filter
            :categories="Object.keys(salesStore.salesByCategory)"
            :selectedCategories="salesStore.selectedCategories"
            :categoryValues="salesStore.salesByCategory"
            @toggle-category="salesStore.toggleCategory"
            @select-all="salesStore.selectAllCategories"
            @deselect-all="salesStore.deselectAllCategories"
          />
        </div>

        <div class="category-chart">
          <pie-chart
            :data="salesStore.filteredCategorySales"
            title="Revenue by Category"
            :isLoading="salesStore.isLoading"
          />
        </div>
      </div>
    </div>

    <div class="summary-section">
      <div class="section-header">
        <h3>Revenue Summary</h3>
      </div>

      <div class="summary-grid">
        <div class="summary-card">
          <div class="summary-title">This Month</div>
          <div class="summary-value">
            {{ formatCurrency(salesStore.monthSummary.revenue) }}
          </div>
          <div class="summary-details">
            <div class="detail-item">
              <span class="detail-label">Orders:</span>
              <span class="detail-value">{{
                formatNumber(salesStore.monthSummary.orders)
              }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Avg. Order:</span>
              <span class="detail-value">{{
                formatCurrency(salesStore.monthSummary.averageOrderValue)
              }}</span>
            </div>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-title">Year to Date</div>
          <div class="summary-value">
            {{ formatCurrency(salesStore.yearSummary.revenue) }}
          </div>
          <div class="summary-details">
            <div class="detail-item">
              <span class="detail-label">Orders:</span>
              <span class="detail-value">{{
                formatNumber(salesStore.yearSummary.orders)
              }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Avg. Order:</span>
              <span class="detail-value">{{
                formatCurrency(salesStore.yearSummary.averageOrderValue)
              }}</span>
            </div>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-title">Marketplace Split</div>
          <div class="marketplace-chart">
            <div class="marketplace-bar">
              <div
                class="marketplace-segment amazon"
                :style="{ width: getMarketplacePercentage('Amazon') + '%' }"
              >
                Amazon
              </div>
              <div
                class="marketplace-segment walmart"
                :style="{ width: getMarketplacePercentage('Walmart') + '%' }"
              >
                Walmart
              </div>
            </div>
            <div class="marketplace-labels">
              <div class="marketplace-label">
                <span class="label-color amazon"></span>
                <span class="label-text"
                  >Amazon:
                  {{
                    formatCurrency(salesStore.salesByMarketplace.Amazon)
                  }}</span
                >
              </div>
              <div class="marketplace-label">
                <span class="label-color walmart"></span>
                <span class="label-text"
                  >Walmart:
                  {{
                    formatCurrency(salesStore.salesByMarketplace.Walmart)
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useSalesStore } from "@/store";
import { formatCurrency, formatNumber } from "@/utils/format";
import StatCard from "@/components/revenue/StatCard.vue";
import LineChart from "@/components/revenue/LineChart.vue";
import PieChart from "@/components/revenue/PieChart.vue";
import CategoryFilter from "@/components/revenue/CategoryFilter.vue";
import TimeFilter from "@/components/revenue/TimeFilter.vue";
import { RefreshCw as RefreshCwIcon } from "lucide-vue-next";

const salesStore = useSalesStore();
const selectedTimeframe = ref("monthly");

// Fetch data on component mount
onMounted(async () => {
  await salesStore.fetchSalesData();
});

// Watch for timeframe changes
watch(selectedTimeframe, (newValue) => {
  salesStore.setTimeframe(newValue);
});

// Calculate marketplace percentages
const getMarketplacePercentage = (marketplace) => {
  const total = Object.values(salesStore.salesByMarketplace).reduce(
    (sum, val) => sum + val,
    0
  );
  return ((salesStore.salesByMarketplace[marketplace] / total) * 100).toFixed(
    1
  );
};

// Refresh data
const refreshData = async () => {
  await salesStore.fetchSalesData();
};
</script>

<style scoped>
.revenue-analysis {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.chart-container {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.chart-controls {
  display: flex;
  gap: 16px;
}

.chart-content {
  height: 300px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
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

.category-section {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 20px;
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
}

.category-chart {
  height: 300px;
}

.summary-section {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 20px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.summary-card {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 16px;
}

.summary-title {
  font-size: 14px;
  color: #a0a0a0;
  margin-bottom: 8px;
}

.summary-value {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.detail-label {
  color: #a0a0a0;
}

.detail-value {
  color: #e0e0e0;
  font-weight: 500;
}

.marketplace-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.marketplace-bar {
  height: 36px;
  display: flex;
  border-radius: 6px;
  overflow: hidden;
}

.marketplace-segment {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.marketplace-segment.amazon {
  background-color: #60a5fa;
}

.marketplace-segment.walmart {
  background-color: #f472b6;
}

.marketplace-labels {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.marketplace-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #e0e0e0;
}

.label-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.label-color.amazon {
  background-color: #60a5fa;
}

.label-color.walmart {
  background-color: #f472b6;
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .chart-controls {
    width: 100%;
  }
}
</style>
