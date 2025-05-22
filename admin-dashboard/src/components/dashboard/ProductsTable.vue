<template>
  <div class="products-table">
    <div class="table-header">
      <div class="table-actions">
        <button class="filter-btn">
          <filter-icon size="16" />
          Filter By
        </button>
        <button class="sort-btn">
          <sort-desc-icon size="16" />
          Sort By: {{ sortBy }}
        </button>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>PRODUCT ID</th>
            <th>IMAGE</th>
            <th>PRODUCT NAME</th>
            <th>PRICE</th>
            <th>TOTAL SALES</th>
            <th>STOCK</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td class="product-id">{{ product.id }}</td>
            <td class="product-image">
              <img :src="product.image" :alt="product.name" />
            </td>
            <td class="product-name">{{ product.name }}</td>
            <td class="product-price">{{ formatCurrency(product.price) }}</td>
            <td class="product-sales">{{ product.totalSales }}</td>
            <td class="product-stock">{{ product.stock }}</td>
            <td class="product-status">
              <span :class="getStatusClass(product.status)">{{
                product.status
              }}</span>
            </td>
            <td class="product-actions">
              <button class="action-btn">
                <more-vertical-icon size="16" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-footer">
      <button class="view-all-btn" @click="emit('view-all')">
        View All Products
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { formatCurrency } from "@/utils/format";
import {
  Filter as FilterIcon,
  SortDesc as SortDescIcon,
  MoreVertical as MoreVerticalIcon,
} from "lucide-vue-next";

const emit = defineEmits(["view-all"]);

const sortBy = ref("Relevance");

const getStatusClass = (status) => {
  switch (status) {
    case "In Stock":
      return "status-in-stock";
    case "Out of Stock":
      return "status-out-of-stock";
    case "Restock":
      return "status-restock";
    default:
      return "";
  }
};
</script>

<style scoped>
.products-table {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.table-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.table-actions {
  display: flex;
  gap: 12px;
}

.filter-btn,
.sort-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #333;
  border: none;
  color: #e0e0e0;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.table-container {
  flex: 1;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 500;
  color: #a0a0a0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

tbody td {
  padding: 16px;
  font-size: 14px;
  color: #e0e0e0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.product-id {
  color: #a0a0a0;
}

.product-image {
  width: 40px;
}

.product-image img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.product-name {
  font-weight: 500;
  color: #ffffff;
}

.product-price {
  font-weight: 500;
}

.product-status span {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-in-stock {
  background-color: rgba(74, 222, 128, 0.1);
  color: #4ade80;
}

.status-out-of-stock {
  background-color: rgba(248, 113, 113, 0.1);
  color: #f87171;
}

.status-restock {
  background-color: rgba(250, 204, 21, 0.1);
  color: #facc15;
}

.product-actions {
  text-align: right;
}

.action-btn {
  background: transparent;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.table-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.view-all-btn {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.view-all-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}
</style>
