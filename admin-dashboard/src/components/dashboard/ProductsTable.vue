<template>
  <div class="products-table-container">
    <div class="table-header">
      <div class="table-actions">
        <button class="action-btn">
          <filter-icon size="16" />
          Filter
        </button>
        <button class="action-btn">
          <sort-desc-icon size="16" />
          Sort: {{ sortBy }}
        </button>
      </div>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Stock</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>
              <img
                class="product-img"
                :src="product.image"
                :alt="product.name"
              />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ formatCurrency(product.price) }}</td>
            <td>{{ product.totalSales }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <span :class="getStatusClass(product.status)">
                {{ product.status }}
              </span>
            </td>
            <td>
              <button class="menu-btn"><more-vertical-icon size="16" /></button>
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

defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["view-all"]);

const sortBy = ref("Relevance");

const getStatusClass = (status) => {
  switch (status) {
    case "In Stock":
      return "status-badge in-stock";
    case "Out of Stock":
      return "status-badge out-stock";
    case "Restock":
      return "status-badge restock";
    default:
      return "status-badge";
  }
};
</script>

<style scoped>
.products-table-container {
  background: rgba(18, 18, 18, 0.95);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  color: #e0e0e0;
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

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #1f1f1f;
  border: 1px solid #2d2d2d;
  color: #f0f0f0;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  transition: 0.2s;
}

.action-btn:hover {
  background-color: #2a2a2a;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
}

thead th {
  text-align: left;
  padding: 14px 16px;
  background: #1e1e1e;
  font-size: 12px;
  font-weight: 600;
  color: #b0b0b0;
  border-bottom: 1px solid #333;
}

tbody td {
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid #2a2a2a;
}

.product-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  text-align: center;
}

.in-stock {
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
}

.out-stock {
  background: rgba(248, 113, 113, 0.15);
  color: #f87171;
}

.restock {
  background: rgba(250, 204, 21, 0.15);
  color: #facc15;
}

.menu-btn {
  background: none;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  border-radius: 4px;
  padding: 4px;
  transition: 0.2s;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.table-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.view-all-btn {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.view-all-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border-color: #ffffff;
}
</style>
