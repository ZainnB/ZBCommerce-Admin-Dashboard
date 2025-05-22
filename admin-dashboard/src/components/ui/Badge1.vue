<template>
  <span
    class="badge"
    :class="[
      `badge-${variant}`,
      { 'badge-pill': pill, 'badge-outline': outline },
    ]"
  >
    <slot></slot>
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      [
        "default",
        "primary",
        "success",
        "warning",
        "danger",
        "info",
        "dark",
        "light",
      ].includes(value),
  },
  pill: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
  white-space: nowrap;
}

.badge-pill {
  border-radius: 9999px;
  padding: 4px 10px;
}

/* Default badge */
.badge-default {
  background-color: rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
}

.badge-default.badge-outline {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
}

/* Primary badge */
.badge-primary {
  background-color: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
}

.badge-primary.badge-outline {
  background-color: transparent;
  border: 1px solid #60a5fa;
  color: #60a5fa;
}

/* Success badge */
.badge-success {
  background-color: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

.badge-success.badge-outline {
  background-color: transparent;
  border: 1px solid #4ade80;
  color: #4ade80;
}

/* Warning badge */
.badge-warning {
  background-color: rgba(250, 204, 21, 0.2);
  color: #facc15;
}

.badge-warning.badge-outline {
  background-color: transparent;
  border: 1px solid #facc15;
  color: #facc15;
}

/* Danger badge */
.badge-danger {
  background-color: rgba(248, 113, 113, 0.2);
  color: #f87171;
}

.badge-danger.badge-outline {
  background-color: transparent;
  border: 1px solid #f87171;
  color: #f87171;
}

/* Info badge */
.badge-info {
  background-color: rgba(148, 163, 184, 0.2);
  color: #94a3b8;
}

.badge-info.badge-outline {
  background-color: transparent;
  border: 1px solid #94a3b8;
  color: #94a3b8;
}

/* Dark badge */
.badge-dark {
  background-color: rgba(30, 41, 59, 0.8);
  color: #e0e0e0;
}

.badge-dark.badge-outline {
  background-color: transparent;
  border: 1px solid #1e293b;
  color: #e0e0e0;
}

/* Light badge */
.badge-light {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.badge-light.badge-outline {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #ffffff;
}
</style>
