<template>
  <div>
    <Toast
      :visible="toast.visible"
      :type="toast.type"
      :title="toast.title"
      :message="toast.message"
      :action-text="toast.actionText"
      @close="hideToast"
      @action="handleToastAction"
    />
    <slot />
  </div>
</template>

<script setup>
import Toast from "@/components/ui/ToastNoti.vue";
import { useToast } from "@/services/toast";

const { toast, hideToast, handleToastAction } = useToast();
</script>
