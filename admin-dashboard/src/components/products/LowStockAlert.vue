<template>
  <div class="low-stock-alert" v-if="lowStockProducts.length > 0">
    <alert-circle-icon size="20" />
    <span
      >{{ lowStockProducts.length }} products are low in stock and need
      attention.</span
    >
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useProductsStore } from "@/store";
import { AlertCircle as AlertCircleIcon } from "lucide-vue-next";

const productsStore = useProductsStore();

const lowStockProducts = computed(() => {
  return productsStore.lowStockProducts;
});
</script>

<style scoped>
.low-stock-alert {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: rgba(248, 113, 113, 0.1);
  border-left: 4px solid #f87171;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.low-stock-alert svg {
  color: #f87171;
}

.low-stock-alert button {
  margin-left: auto;
  background-color: rgba(248, 113, 113, 0.2);
  border: none;
  color: #f87171;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.low-stock-alert button:hover {
  background-color: rgba(248, 113, 113, 0.3);
}
</style>
