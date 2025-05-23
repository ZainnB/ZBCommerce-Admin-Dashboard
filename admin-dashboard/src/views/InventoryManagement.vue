<template>
  <div class="inventory-page">
    <div class="page-header">
      <div class="header-content">
        <h2>Inventory Management</h2>
        <p class="subtitle">Manage your product inventory and stock levels</p>
      </div>
      <div class="header-actions">
        <button
          class="add-product-btn"
          @click="$router.push('/product_registration')"
        >
          <div class="btn-icon">
            <plus-icon size="18" />
          </div>
          <span>Add New Product</span>
        </button>
      </div>
    </div>

    <div class="dashboard-cards">
      <div class="dashboard-card">
        <div class="card-icon total-products">
          <package-icon size="20" />
        </div>
        <div class="card-content">
          <span class="card-label">Total Products</span>
          <span class="card-value">{{ productsStore.totalProducts }}</span>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="card-icon total-stock">
          <layers-icon size="20" />
        </div>
        <div class="card-content">
          <span class="card-label">Total Stock</span>
          <span class="card-value">{{ productsStore.totalStock }}</span>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="card-icon low-stock">
          <alert-triangle-icon size="20" />
        </div>
        <div class="card-content">
          <span class="card-label">Low Stock Items</span>
          <span class="card-value">{{
            productsStore.lowStockProducts.length
          }}</span>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="card-icon out-of-stock">
          <x-circle-icon size="20" />
        </div>
        <div class="card-content">
          <span class="card-label">Out of Stock</span>
          <span class="card-value">{{
            productsStore.outOfStockProducts.length
          }}</span>
        </div>
      </div>
    </div>

    <low-stock-alert @view-low-stock="showLowStockOnly = true" />

    <div class="control-panel">
      <div class="search-filter">
        <div class="search-bar">
          <search-icon size="18" class="search-icon" />
          <input
            type="text"
            v-model="search"
            placeholder="Search products by name, SKU, or category..."
            @input="onSearch"
          />
          <button v-if="search" class="clear-search" @click="clearSearch">
            <x-icon size="16" />
          </button>
        </div>

        <div class="filter-controls">
          <div class="filter-select">
            <select v-model="category" @change="onCategoryChange">
              <option value="">All Categories</option>
              <option
                v-for="cat in productsStore.categories"
                :key="cat"
                :value="cat"
              >
                {{ cat }}
              </option>
            </select>
            <chevron-down-icon size="16" class="select-icon" />
          </div>

          <div class="filter-select">
            <select v-model="stockFilter" @change="onStockFilterChange">
              <option value="all">All Stock Levels</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
              <option value="in">In Stock</option>
            </select>
            <chevron-down-icon size="16" class="select-icon" />
          </div>
        </div>
      </div>

      <div class="view-toggle">
        <button
          :class="{ active: viewMode === 'grid' }"
          @click="viewMode = 'grid'"
        >
          <grid-icon size="18" />
          <span>Grid</span>
        </button>
        <button
          :class="{ active: viewMode === 'table' }"
          @click="viewMode = 'table'"
        >
          <list-icon size="18" />
          <span>Table</span>
        </button>
      </div>
    </div>

    <div v-if="showLowStockOnly" class="status-banner low-stock-banner">
      <alert-circle-icon size="18" />
      <span>Showing low stock products only</span>
      <button @click="showLowStockOnly = false">Show All Products</button>
    </div>

    <div v-else-if="isFiltered" class="status-banner filter-banner">
      <filter-icon size="18" />
      <span
        >Filtered results: {{ displayedProducts.length }} products found</span
      >
      <button @click="clearAllFilters">Clear Filters</button>
    </div>

    <transition name="fade" mode="out-in">
      <div
        v-if="viewMode === 'grid'"
        key="grid"
        class="products-grid-container"
      >
        <product-list :products="displayedProducts" />
      </div>
      <div v-else key="table" class="products-table-container">
        <products-ag-grid :products="displayedProducts" />
      </div>
    </transition>

    <div v-if="displayedProducts.length === 0" class="no-results">
      <package-search-icon size="48" />
      <h3>No products found</h3>
      <p>Try adjusting your search or filter criteria</p>
      <button @click="clearAllFilters" class="reset-btn">Reset Filters</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useProductsStore } from "@/store";
import ProductList from "@/components/products/ProductList.vue";
import ProductsAgGrid from "@/components/products/ProductsAgGrid.vue";
import LowStockAlert from "@/components/products/LowStockAlert.vue";

import {
  Plus as PlusIcon,
  Grid as GridIcon,
  List as ListIcon,
  AlertCircle as AlertCircleIcon,
  Search as SearchIcon,
  X as XIcon,
  ChevronDown as ChevronDownIcon,
  Filter as FilterIcon,
  Package as PackageIcon,
  Layers as LayersIcon,
  AlertTriangle as AlertTriangleIcon,
  XCircle as XCircleIcon,
  PackageSearch as PackageSearchIcon,
} from "lucide-vue-next";

const productsStore = useProductsStore();
const viewMode = ref("grid");
const search = ref("");
const category = ref("");
const stockFilter = ref("all");
const showLowStockOnly = ref(false);

onMounted(async () => {
  await productsStore.fetchProducts();
});

const displayedProducts = computed(() => {
  let products = productsStore.filteredProducts;

  if (showLowStockOnly.value) {
    products = products.filter((p) => p.stock < 10);
  } else if (stockFilter.value === "out") {
    products = products.filter((p) => p.stock === 0);
  } else if (stockFilter.value === "in") {
    products = products.filter((p) => p.stock > 10);
  }

  return products;
});

const onSearch = () => {
  productsStore.setSearchQuery(search.value);
};

const onCategoryChange = () => {
  productsStore.setFilterCategory(category.value);
};

const onStockFilterChange = () => {
  if (stockFilter.value === "all") {
    showLowStockOnly.value = false;
  } else if (stockFilter.value === "low") {
    showLowStockOnly.value = true;
  } else if (stockFilter.value === "out") {
    showLowStockOnly.value = false;
    productsStore.setStockFilter("out");
  } else if (stockFilter.value === "in") {
    showLowStockOnly.value = false;
    productsStore.setStockFilter("in");
  }
};

const clearSearch = () => {
  search.value = "";
  productsStore.setSearchQuery("");
};

const clearAllFilters = () => {
  search.value = "";
  category.value = "";
  stockFilter.value = "all";
  showLowStockOnly.value = false;
  productsStore.setSearchQuery("");
  productsStore.setFilterCategory("");
  productsStore.setStockFilter("all");
};

const isFiltered = computed(() => {
  return search.value || category.value || stockFilter.value !== "all";
});

watch(showLowStockOnly, (newValue) => {
  if (newValue) {
    search.value = "";
    category.value = "";
    stockFilter.value = "low";
    productsStore.setSearchQuery("");
    productsStore.setFilterCategory("");
  } else {
    stockFilter.value = "all";
  }
});
</script>

<style scoped>
.inventory-page {
  padding: 24px;
  min-height: 100%;
  position: relative;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
}

.header-content {
  position: relative;
}

.page-header h2 {
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.page-header h2::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #60a5fa, #4ade80);
  border-radius: 3px;
}

.subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin-top: 16px;
}

.add-product-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #4ade80, #60a5fa);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.2);
}

.add-product-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(74, 222, 128, 0.3);
}

.add-product-btn .btn-icon {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-product-btn span {
  padding: 0 16px;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.dashboard-card {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon.total-products {
  background: linear-gradient(135deg, #60a5fa20, #60a5fa40);
  color: #60a5fa;
}

.card-icon.total-stock {
  background: linear-gradient(135deg, #4ade8020, #4ade8040);
  color: #4ade80;
}

.card-icon.low-stock {
  background: linear-gradient(135deg, #facc1520, #facc1540);
  color: #facc15;
}

.card-icon.out-of-stock {
  background: linear-gradient(135deg, #f8717120, #f8717140);
  color: #f87171;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
}

.card-value {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.search-filter {
  display: flex;
  gap: 16px;
  flex: 1;
}

.search-bar {
  position: relative;
  flex: 1;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
}

.search-bar input {
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 40px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
}

.search-bar input:focus {
  border-color: #60a5fa;
  outline: none;
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
}

.clear-search {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s;
}

.clear-search:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.filter-controls {
  display: flex;
  gap: 12px;
}

.filter-select {
  position: relative;
}

.filter-select select {
  appearance: none;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 36px 12px 16px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  min-width: 180px;
  transition: all 0.3s ease;
}

.filter-select select:focus {
  border-color: #60a5fa;
  outline: none;
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
}

.select-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.view-toggle {
  display: flex;
  gap: 8px;
}

.view-toggle button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.view-toggle button:hover {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.2);
}

.view-toggle button.active {
  background: rgba(74, 222, 128, 0.1);
  color: #4ade80;
  border-color: rgba(74, 222, 128, 0.3);
}

.status-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.low-stock-banner {
  background: linear-gradient(
    90deg,
    rgba(248, 113, 113, 0.1),
    rgba(248, 113, 113, 0.05)
  );
  border: 1px solid rgba(248, 113, 113, 0.2);
}

.low-stock-banner svg {
  color: #f87171;
}

.low-stock-banner span {
  color: #f87171;
  font-weight: 500;
}

.filter-banner {
  background: linear-gradient(
    90deg,
    rgba(96, 165, 250, 0.1),
    rgba(96, 165, 250, 0.05)
  );
  border: 1px solid rgba(96, 165, 250, 0.2);
}

.filter-banner svg {
  color: #60a5fa;
}

.filter-banner span {
  color: #60a5fa;
  font-weight: 500;
}

.status-banner button {
  margin-left: auto;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.status-banner button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.products-grid-container,
.products-table-container {
  min-height: 400px;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

.no-results svg {
  margin-bottom: 16px;
  opacity: 0.5;
}

.no-results h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
}

.no-results p {
  margin-bottom: 20px;
}

.reset-btn {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
  border: 1px solid rgba(96, 165, 250, 0.3);
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: rgba(96, 165, 250, 0.2);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 1200px) {
  .dashboard-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 992px) {
  .control-panel {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .search-filter {
    flex-direction: column;
  }

  .view-toggle {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-actions {
    width: 100%;
  }

  .add-product-btn {
    width: 100%;
    justify-content: center;
  }

  .dashboard-cards {
    grid-template-columns: 1fr;
  }

  .filter-controls {
    flex-direction: column;
  }

  .filter-select select {
    width: 100%;
  }
}
</style>
