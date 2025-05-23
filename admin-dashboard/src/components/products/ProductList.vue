<template>
  <div class="product-list">
    <div class="list-header">
      <div class="search-filter">
        <div class="search-box">
          <search-icon size="18" class="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            v-model="searchQuery"
            @input="handleSearch"
          />
        </div>

        <div class="category-filter">
          <select v-model="selectedCategory" @change="handleCategoryFilter">
            <option value="">All Categories</option>
            <option
              v-for="category in productsStore.categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
      </div>

      <div class="sort-controls">
        <label>Sort by:</label>
        <select v-model="sortField" @change="handleSort">
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
          <option value="category">Category</option>
        </select>

        <button class="sort-direction" @click="toggleSortDirection">
          <arrow-up-icon v-if="sortDirection === 'asc'" size="18" />
          <arrow-down-icon v-else size="18" />
        </button>
      </div>
    </div>

    <div class="products-grid">
      <product-card
        v-for="product in productsStore.filteredProducts"
        :key="product.id"
        :product="product"
        @edit="editProduct"
        @view="viewProduct"
      />
    </div>

    <div v-if="productsStore.filteredProducts.length === 0" class="no-results">
      <package-x-icon size="48" />
      <p>No products found</p>
      <button class="reset-btn" @click="resetFilters">Reset Filters</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProductsStore } from "@/store";
import ProductCard from "./ProductCard.vue";
import {
  Search as SearchIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  PackageX as PackageXIcon,
} from "lucide-vue-next";

const productsStore = useProductsStore();


const searchQuery = ref("");
const selectedCategory = ref("");
const sortField = ref("name");
const sortDirection = ref("asc");


const handleSearch = () => {
  productsStore.setSearchQuery(searchQuery.value);
};

const handleCategoryFilter = () => {
  productsStore.setFilterCategory(selectedCategory.value);
};

const handleSort = () => {
  productsStore.setSorting(sortField.value, sortDirection.value);
};

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  productsStore.setSorting(sortField.value, sortDirection.value);
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  sortField.value = "name";
  sortDirection.value = "asc";
  productsStore.setSearchQuery("");
  productsStore.setFilterCategory("");
  productsStore.setSorting("name", "asc");
};


const editProduct = (product) => {
  
  console.log("Edit product:", product);
};

const viewProduct = (product) => {
  
  console.log("View product:", product);
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-filter {
  display: flex;
  gap: 16px;
}

.search-box {
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0a0a0;
}

.search-box input {
  width: 100%;
  padding: 10px 16px 10px 40px;
  border-radius: 8px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 14px;
}

.category-filter select {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-controls label {
  color: #a0a0a0;
}

.sort-controls select {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}

.sort-direction {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #a0a0a0;
}

.no-results p {
  margin: 16px 0;
  font-size: 18px;
}

.reset-btn {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .search-filter {
    width: 100%;
    flex-direction: column;
    gap: 12px;
  }

  .search-box {
    width: 100%;
  }

  .category-filter select {
    width: 100%;
  }

  .sort-controls {
    width: 100%;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
