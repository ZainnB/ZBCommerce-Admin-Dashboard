<template>
  <div class="stat-card">
    <div class="stat-title">{{ title }}</div>
    <div class="stat-value">{{ formattedValue }}</div>
    <div class="stat-comparison" v-if="comparison !== undefined">
      <div class="comparison-value" :class="comparisonClass">
        <arrow-up-icon v-if="comparison > 0" size="14" />
        <arrow-down-icon v-if="comparison < 0" size="14" />
        {{ Math.abs(comparison) }}%
      </div>
      <div class="comparison-period">vs. previous period</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatCurrency, formatNumber } from "@/utils/format";
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
  format: {
    type: String,
    default: "currency",
    validator: (value) => ["currency", "number", "raw"].includes(value),
  },
  comparison: {
    type: Number,
    default: undefined,
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

const comparisonClass = computed(() => {
  if (props.comparison > 0) {
    return "positive";
  } else if (props.comparison < 0) {
    return "negative";
  }
  return "";
});
</script>

<style scoped>
.stat-card {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-title {
  font-size: 14px;
  color: #a0a0a0;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
}

.stat-comparison {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.comparison-value {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
}

.comparison-value.positive {
  color: #4ade80;
}

.comparison-value.negative {
  color: #f87171;
}

.comparison-period {
  font-size: 14px;
  color: #a0a0a0;
}
</style>
