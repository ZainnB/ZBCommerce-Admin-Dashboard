<template>
  <transition name="toast">
    <div
      v-if="visible"
      class="toast"
      :class="[`toast-${type}`, { 'with-action': !!actionText }]"
    >
      <div class="toast-icon">
        <check-circle-icon v-if="type === 'success'" />
        <alert-circle-icon v-if="type === 'error'" />
        <info-icon v-if="type === 'info'" />
        <alert-triangle-icon v-if="type === 'warning'" />
      </div>
      <div class="toast-content">
        <div class="toast-title" v-if="title">{{ title }}</div>
        <div class="toast-message">{{ message }}</div>
      </div>
      <button v-if="actionText" class="toast-action" @click="$emit('action')">
        {{ actionText }}
      </button>
      <button class="toast-close" @click="$emit('close')">
        <x-icon size="16" />
      </button>
    </div>
  </transition>
</template>

<script setup>
import {
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  AlertTriangle as AlertTriangleIcon,
  X as XIcon,
} from "lucide-vue-next";

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "info",
    validator: (value) =>
      ["success", "error", "info", "warning"].includes(value),
  },
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    required: true,
  },
  actionText: {
    type: String,
    default: "",
  },
});

defineEmits(["close", "action"]);
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.toast-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.toast-message {
  font-size: 14px;
  opacity: 0.9;
}

.toast-action {
  margin-left: 16px;
  background: transparent;
  border: none;
  color: #60a5fa;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 14px;
}

.toast-close {
  margin-left: 16px;
  background: transparent;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.toast-close:hover {
  color: #ffffff;
}

.toast-success .toast-icon {
  color: #4ade80;
}

.toast-error .toast-icon {
  color: #f87171;
}

.toast-warning .toast-icon {
  color: #facc15;
}

.toast-info .toast-icon {
  color: #60a5fa;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
