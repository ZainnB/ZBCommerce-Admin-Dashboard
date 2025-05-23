<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      {
        'btn-block': block,
        'btn-rounded': rounded,
        'btn-outline': outline,
        'btn-icon': icon,
        'btn-loading': loading,
      },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="btn-spinner"></span>
    <slot v-if="!loading || (loading && showTextWhileLoading)"></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
        "light",
        "link",
      ].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  block: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showTextWhileLoading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn-md {
  padding: 8px 16px;
  font-size: 14px;
}

.btn-lg {
  padding: 10px 20px;
  font-size: 16px;
}

.btn-primary {
  background-color: #60a5fa;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background-color: #3b82f6;
}

.btn-primary.btn-outline {
  background-color: transparent;
  border: 1px solid #60a5fa;
  color: #60a5fa;
}

.btn-primary.btn-outline:hover:not(:disabled) {
  background-color: #60a5fa;
  color: #ffffff;
}

.btn-secondary {
  background-color: #6b7280;
  color: #ffffff;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.btn-secondary.btn-outline {
  background-color: transparent;
  border: 1px solid #6b7280;
  color: #6b7280;
}

.btn-secondary.btn-outline:hover:not(:disabled) {
  background-color: #6b7280;
  color: #ffffff;
}

.btn-success {
  background-color: #4ade80;
  color: #ffffff;
}

.btn-success:hover:not(:disabled) {
  background-color: #22c55e;
}

.btn-success.btn-outline {
  background-color: transparent;
  border: 1px solid #4ade80;
  color: #4ade80;
}

.btn-success.btn-outline:hover:not(:disabled) {
  background-color: #4ade80;
  color: #ffffff;
}

.btn-danger {
  background-color: #f87171;
  color: #ffffff;
}

.btn-danger:hover:not(:disabled) {
  background-color: #ef4444;
}

.btn-danger.btn-outline {
  background-color: transparent;
  border: 1px solid #f87171;
  color: #f87171;
}

.btn-danger.btn-outline:hover:not(:disabled) {
  background-color: #f87171;
  color: #ffffff;
}

.btn-warning {
  background-color: #facc15;
  color: #1e293b;
}

.btn-warning:hover:not(:disabled) {
  background-color: #eab308;
}

.btn-warning.btn-outline {
  background-color: transparent;
  border: 1px solid #facc15;
  color: #facc15;
}

.btn-warning.btn-outline:hover:not(:disabled) {
  background-color: #facc15;
  color: #1e293b;
}

.btn-info {
  background-color: #94a3b8;
  color: #ffffff;
}

.btn-info:hover:not(:disabled) {
  background-color: #64748b;
}

.btn-info.btn-outline {
  background-color: transparent;
  border: 1px solid #94a3b8;
  color: #94a3b8;
}

.btn-info.btn-outline:hover:not(:disabled) {
  background-color: #94a3b8;
  color: #ffffff;
}

.btn-dark {
  background-color: #1e293b;
  color: #ffffff;
}

.btn-dark:hover:not(:disabled) {
  background-color: #0f172a;
}

.btn-dark.btn-outline {
  background-color: transparent;
  border: 1px solid #1e293b;
  color: #e0e0e0;
}

.btn-dark.btn-outline:hover:not(:disabled) {
  background-color: #1e293b;
  color: #ffffff;
}

.btn-light {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.btn-light:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.btn-light.btn-outline {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.btn-light.btn-outline:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1);
}

.btn-link {
  background-color: transparent;
  color: #60a5fa;
  padding-left: 0;
  padding-right: 0;
}

.btn-link:hover:not(:disabled) {
  text-decoration: underline;
}

/* Button modifiers */
.btn-block {
  display: flex;
  width: 100%;
}

.btn-rounded {
  border-radius: 9999px;
}

.btn-icon {
  padding: 0;
  width: 36px;
  height: 36px;
  border-radius: 6px;
}

.btn-icon.btn-sm {
  width: 30px;
  height: 30px;
}

.btn-icon.btn-lg {
  width: 42px;
  height: 42px;
}

.btn-icon.btn-rounded {
  border-radius: 50%;
}

/* Loading spinner */
.btn-loading {
  position: relative;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

.btn-outline .btn-spinner {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: currentColor;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
