<template>
  <div class="chart-wrapper" ref="chartContainer">
    <canvas ref="chartCanvas"></canvas>
    <div v-if="isLoading" class="loading-overlay">
      <loader-icon size="32" class="spinner" />
      <span>Loading data...</span>
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
  title: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "#4ade80",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const chartCanvas = ref(null);
const chartContainer = ref(null);
let chart = null;

const createChart = () => {
  if (!chartCanvas.value) return;

  if (chart) {
    chart.destroy();
  }

  const ctx = chartCanvas.value.getContext("2d");

  // Create gradient fill
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
  gradientFill.addColorStop(0, `${props.color}33`); // 20% opacity
  gradientFill.addColorStop(1, `${props.color}00`); // 0% opacity

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: props.data.labels || [],
      datasets: [
        {
          label: props.title,
          data: props.data.values || [],
          borderColor: props.color,
          backgroundColor: gradientFill,
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: props.color,
          pointBorderColor: "#fff",
          pointRadius: 4,
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
                return `Rs ${value / 1000000}M`;
              } else if (value >= 1000) {
                return `Rs ${value / 1000}K`;
              }
              return `Rs ${value}`;
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
  () => props.data,
  () => {
    createChart();
  },
  { deep: true }
);
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #ffffff;
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
