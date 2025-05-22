<template>
  <div class="sales-chart">
    <div class="chart-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="{ active: modelValue === tab.value }"
        @click="emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </button>
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
import { formatCurrency } from "@/utils/format";
import { Loader as LoaderIcon } from "lucide-vue-next";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  tabs: {
    type: Array,
    default: () => [
      { label: "Daily", value: "daily" },
      { label: "Weekly", value: "weekly" },
      { label: "Monthly", value: "monthly" },
      { label: "Yearly", value: "yearly" },
    ],
  },
});

const emit = defineEmits(["update:modelValue"]);

const chartCanvas = ref(null);
let chart = null;

const createChart = () => {
  if (!chartCanvas.value) return;

  if (chart) {
    chart.destroy();
  }

  const ctx = chartCanvas.value.getContext("2d");

  // Create gradient fill
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
  gradientFill.addColorStop(0, "rgba(96, 165, 250, 0.2)");
  gradientFill.addColorStop(1, "rgba(96, 165, 250, 0)");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: props.data.labels || [],
      datasets: [
        {
          label: "Sales",
          data: props.data.values || [],
          borderColor: "#60a5fa",
          backgroundColor: gradientFill,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#60a5fa",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 6,
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
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += formatCurrency(context.parsed.y);
              }
              return label;
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
            callback: function (value) {
              if (value >= 1000000) {
                return `${value / 1000000}M`;
              } else if (value >= 1000) {
                return `${value / 1000}K`;
              }
              return value;
            },
          },
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "index",
        intersect: false,
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
  () => [props.data, props.modelValue],
  () => {
    createChart();
  },
  { deep: true }
);
</script>

<style scoped>
.sales-chart {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chart-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.chart-tabs button {
  background: transparent;
  border: none;
  color: #a0a0a0;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.chart-tabs button.active {
  background-color: #333;
  color: #ffffff;
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
