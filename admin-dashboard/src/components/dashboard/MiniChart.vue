<template>
  <div class="mini-chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  color: {
    type: String,
    default: "#4ade80",
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
    type: "line",
    data: {
      labels: Array(props.data.length).fill(""),
      datasets: [
        {
          data: props.data,
          borderColor: props.color,
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          fill: false,
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
          enabled: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
      },
    },
  });
};

onMounted(() => {
  if (chartCanvas.value) {
    createChart();
  }
});

onBeforeUnmount(() => {
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
.mini-chart {
  width: 100%;
  height: 100%;
}
</style>
