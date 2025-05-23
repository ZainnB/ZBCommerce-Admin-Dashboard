import { reactive } from "vue";

const toast = reactive({
  visible: false,
  type: "info",
  title: "",
  message: "",
  actionText: "",
  actionCallback: null,
  timeout: null,
});

const DEFAULT_DURATION = 5000;

export const showToast = ({
  type = "info",
  title = "",
  message,
  actionText = "",
  actionCallback = null,
  duration = DEFAULT_DURATION,
}) => {
  if (toast.timeout) {
    clearTimeout(toast.timeout);
  }

  Object.assign(toast, {
    visible: true,
    type,
    title,
    message,
    actionText,
    actionCallback,
  });

  if (duration > 0) {
    toast.timeout = setTimeout(() => {
      hideToast();
    }, duration);
  }
};

export const hideToast = () => {
  toast.visible = false;

  if (toast.timeout) {
    clearTimeout(toast.timeout);
    toast.timeout = null;
  }
};

export const handleToastAction = () => {
  if (toast.actionCallback) {
    toast.actionCallback();
  }
  hideToast();
};

export const showSuccessToast = (message, options = {}) => {
  showToast({ type: "success", message, ...options });
};

export const showErrorToast = (message, options = {}) => {
  showToast({ type: "error", message, ...options });
};

export const showInfoToast = (message, options = {}) => {
  showToast({ type: "info", message, ...options });
};

export const showWarningToast = (message, options = {}) => {
  showToast({ type: "warning", message, ...options });
};

export const useToast = () => {
  return {
    toast,
    showToast,
    hideToast,
    handleToastAction,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
  };
};
