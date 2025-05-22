<template>
  <div class="time-filter">
    <button
      v-for="period in periods"
      :key="period.value"
      :class="{ active: modelValue === period.value }"
      @click="$emit('update:modelValue', period.value)"
    >
      {{ period.label }}
    </button>
  </div>
</template>

<script setup>
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.time-filter {
  display: flex;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 4px;
}

.time-filter button {
  background: transparent;
  border: none;
  color: #a0a0a0;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.time-filter button.active {
  background-color: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

.time-filter button:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}
</style>
