<template>
  <div class="stat-card">
    <div class="stat-header">
      <div class="stat-title">{{ title }}</div>
      <div class="stat-value">{{ formattedValue }}</div>
      <div class="stat-change" :class="changeClass">
        <arrow-up-icon v-if="change > 0" size="14" />
        <arrow-down-icon v-if="change < 0" size="14" />
        {{ Math.abs(change) }}% from yesterday
      </div>
    </div>
    <div class="stat-chart">
      <mini-chart :data="chartData" :color="chartColor" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatCurrency, formatNumber } from "@/utils/format";
import MiniChart from "./MiniChart.vue";
import {
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
} from "lucide-vue-next";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [Number, String],
    required: true,
  },
  change: {
    type: Number,
    default: 0,
  },
  chartData: {
    type: Array,
    default: () => [],
  },
  chartColor: {
    type: String,
    default: "#4ade80",
  },
  format: {
    type: String,
    default: "currency",
    validator: (value) => ["currency", "number", "raw"].includes(value),
  },
});

const formattedValue = computed(() => {
  if (typeof props.value === "string") {
    return props.value;
  }

  switch (props.format) {
    case "currency":
      return formatCurrency(props.value);
    case "number":
      return formatNumber(props.value);
    case "raw":
    default:
      return props.value;
  }
});

const changeClass = computed(() => {
  return props.change > 0 ? "positive" : "negative";
});
</script>

<style scoped>
.stat-card {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.stat-header {
  position: relative;
  z-index: 2;
}

.stat-title {
  font-size: 14px;
  color: #a0a0a0;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}

.stat-change.positive {
  color: #4ade80;
}

.stat-change.negative {
  color: #f87171;
}

.stat-chart {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 120px;
  height: 50px;
  opacity: 0.5;
  z-index: 1;
}
</style>
