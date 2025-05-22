<template>
  <div class="returns-chart">
    <div class="chart-header">
      <div class="date-selector">
        <span>{{ dateRange }}</span>
        <chevron-down-icon size="16" />
      </div>
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
      <div v-if="isLoading" class="loading-overlay">
        <loader-icon size="32" class="spinner" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";
import {
  ChevronDown as ChevronDownIcon,
  Loader as LoaderIcon,
} from "lucide-vue-next";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  dateRange: {
    type: String,
    default: "Jan - Jun '23",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const chartCanvas = ref(null);
let chart = null;

const createChart = () => {
  if (!chartCanvas.value) return;

  if (chart) {
    chart.destroy();
  }

  const ctx = chartCanvas.value.getContext("2d");

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: props.data.labels || [],
      datasets: [
        {
          label: "Returns",
          data: props.data.values || [],
          backgroundColor: "#4ade80",
          borderRadius: 4,
          barThickness: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          titleColor: "#ffffff",
          bodyColor: "#e0e0e0",
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function (context) {
              const value = context.raw;
              const percentage =
                props.data.percentages?.[context.dataIndex] || 0;
              return [`Returns: ${value}`, `Percentage: ${percentage}%`];
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: "#a0a0a0",
            font: {
              size: 12,
            },
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
            drawBorder: false,
          },
          ticks: {
            color: "#a0a0a0",
            font: {
              size: 12,
            },
          },
        },
      },
    },
  });
};

const resizeChart = () => {
  if (chart) {
    chart.resize();
  }
};

onMounted(() => {
  if (chartCanvas.value) {
    createChart();
    window.addEventListener("resize", resizeChart);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  if (chart) {
    chart.destroy();
  }
});

watch(
  () => props.data,
  () => {
    createChart();
  },
  { deep: true }
);
</script>

<style scoped>
.returns-chart {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chart-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.date-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #333;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.chart-container {
  position: relative;
  flex: 1;
  min-height: 300px;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
