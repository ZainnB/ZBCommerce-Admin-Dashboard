<template>
  <div class="product-card" :class="{ 'low-stock': isLowStock }">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-details">
      <div class="product-id">{{ product.id }}</div>
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-category">{{ product.category }}</div>
      <div class="product-price">{{ formattedPrice }}</div>
      <div class="product-stock" :class="stockClass">
        <span>Stock: {{ product.stock }}</span>
        <span v-if="isLowStock" class="low-stock-badge">Low Stock</span>
        <span v-if="product.stock === 0" class="out-of-stock-badge"
          >Out of Stock</span
        >
      </div>
    </div>
    <div class="product-actions">
      <button class="edit-btn" @click="emit('edit', product)">
        <edit-icon size="16" />
        Edit
      </button>
      <button class="view-btn" @click="emit('view', product)">
        <eye-icon size="16" />
        View
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatCurrency } from "@/utils/format";
import { Edit as EditIcon, Eye as EyeIcon } from "lucide-vue-next";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "view"]);

const formattedPrice = computed(() => {
  return formatCurrency(props.product.price);
});

const isLowStock = computed(() => {
  return (
    props.product.stock <= props.product.threshold && props.product.stock > 0
  );
});

const stockClass = computed(() => {
  if (props.product.stock === 0) return "out-of-stock";
  if (props.product.stock <= props.product.threshold) return "low-stock";
  return "in-stock";
});
</script>

<style scoped>
.product-card {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 16px;
  transition: all 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #333;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  flex: 1;
}

.product-id {
  font-size: 12px;
  color: #a0a0a0;
  margin-bottom: 4px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 4px;
}

.product-category {
  font-size: 14px;
  color: #a0a0a0;
  margin-bottom: 8px;
}

.product-price {
  font-size: 16px;
  font-weight: 500;
  color: #4ade80;
  margin-bottom: 8px;
}

.product-stock {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-stock.in-stock {
  color: #4ade80;
}

.product-stock.low-stock {
  color: #facc15;
}

.product-stock.out-of-stock {
  color: #f87171;
}

.low-stock-badge,
.out-of-stock-badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.low-stock-badge {
  background-color: rgba(250, 204, 21, 0.1);
  color: #facc15;
}

.out-of-stock-badge {
  background-color: rgba(248, 113, 113, 0.1);
  color: #f87171;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.edit-btn,
.view-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #e0e0e0;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.edit-btn:hover,
.view-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
