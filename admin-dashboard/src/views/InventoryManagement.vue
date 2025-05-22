<template>
  <div class="products-page">
    <div class="page-header">
      <h2>Products</h2>
      <div class="header-actions">
        <div class="page-actions">
          <button
            class="add-product-btn"
            @click="$router.push('/inventory_management')"
          >
            <plus-icon size="18" />
            Add New Product
          </button>
        </div>
      </div>
    </div>

    <low-stock-alert @view-low-stock="showLowStockOnly = true" />

    <div class="view-toggle">
      <button
        :class="{ active: viewMode === 'grid' }"
        @click="viewMode = 'grid'"
      >
        <grid-icon size="18" />
        Grid View
      </button>
      <button
        :class="{ active: viewMode === 'table' }"
        @click="viewMode = 'table'"
      >
        <list-icon size="18" />
        Table View
      </button>
    </div>

    <div v-if="showLowStockOnly" class="low-stock-banner">
      <alert-circle-icon size="18" />
      <span>Showing low stock products only</span>
      <button @click="showLowStockOnly = false">Show All Products</button>
    </div>

    <div v-if="viewMode === 'grid'">
      <product-list />
    </div>
    <div v-else>
      <products-ag-grid />
    </div>
    <product-list :products="productsStore.products" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useProductsStore } from "@/store";
import ProductList from "@/components/products/ProductList.vue";
import ProductsAgGrid from "@/components/products/ProductsAgGrid.vue";
import LowStockAlert from "@/components/products/LowStockAlert.vue";

import {
  Plus as PlusIcon,
  Grid as GridIcon,
  List as ListIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-vue-next";

const productsStore = useProductsStore();
const viewMode = ref("grid");
const showLowStockOnly = ref(false);

onMounted(async () => {
  await productsStore.fetchProducts();
});

watch(showLowStockOnly, (newValue) => {
  if (newValue) {
    // Filtering to only show low stock products
    productsStore.setSearchQuery("");
    productsStore.setFilterCategory("");
    console.log("Show only low stock products");
  } else {
    productsStore.setSearchQuery("");
    productsStore.setFilterCategory("");
  }
});
</script>

<style scoped>
.products-page {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.page-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.add-product-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #60a5fa;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.add-product-btn:hover {
  background-color: #3b82f6;
}

.view-toggle {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.view-toggle button {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #a0a0a0;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.view-toggle button.active {
  background-color: rgba(74, 222, 128, 0.1);
  color: #4ade80;
}

.low-stock-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: rgba(248, 113, 113, 0.1);
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.low-stock-banner svg {
  color: #f87171;
}

.low-stock-banner span {
  color: #f87171;
  font-weight: 500;
}

.low-stock-banner button {
  margin-left: auto;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
</style>
