<template>
  <div class="category-filter">
    <div class="filter-header">
      <h4>Filter by Category</h4>
      <button class="select-all" @click="toggleAllCategories">
        {{ allCategoriesSelected ? "Deselect All" : "Select All" }}
      </button>
    </div>

    <div class="category-checkboxes">
      <div
        v-for="category in categories"
        :key="category"
        class="category-checkbox"
      >
        <label :class="{ checked: isCategorySelected(category) }">
          <input
            type="checkbox"
            :checked="isCategorySelected(category)"
            @change="toggleCategory(category)"
          />
          <span>{{ category }}</span>
        </label>
        <span
          class="category-value"
          v-if="categoryValues && categoryValues[category]"
        >
          {{ formatCurrency(categoryValues[category]) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatCurrency } from "@/utils/format";

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  selectedCategories: {
    type: Array,
    required: true,
  },
  categoryValues: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits([
  "update:selectedCategories",
  "toggle-category",
  "select-all",
  "deselect-all",
]);

const allCategoriesSelected = computed(() => {
  return props.selectedCategories.length === props.categories.length;
});

const isCategorySelected = (category) => {
  return props.selectedCategories.includes(category);
};

const toggleCategory = (category) => {
  emit("toggle-category", category);
};

const toggleAllCategories = () => {
  if (allCategoriesSelected.value) {
    emit("deselect-all");
  } else {
    emit("select-all");
  }
};
</script>

<style scoped>
.category-filter {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 16px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.filter-header h4 {
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
}

.select-all {
  background: transparent;
  border: none;
  color: #4ade80;
  cursor: pointer;
  font-size: 14px;
}

.category-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-checkbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-checkbox label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.category-checkbox input {
  width: 16px;
  height: 16px;
  accent-color: #4ade80;
}

.category-value {
  font-size: 14px;
  color: #e0e0e0;
}
</style>
