import { reactive } from "vue";

// Toast state
const toast = reactive({
  visible: false,
  type: "info",
  title: "",
  message: "",
  actionText: "",
  actionCallback: null,
  timeout: null,
});

// Default duration for toasts
const DEFAULT_DURATION = 5000;

/**
 * Show a toast notification
 * @param {Object} options - Toast options
 * @param {string} options.type - Toast type (success, error, info, warning)
 * @param {string} options.title - Toast title
 * @param {string} options.message - Toast message
 * @param {string} options.actionText - Text for the action button
 * @param {Function} options.actionCallback - Callback for the action button
 * @param {number} options.duration - Duration in milliseconds
 */
export const showToast = ({
  type = "info",
  title = "",
  message,
  actionText = "",
  actionCallback = null,
  duration = DEFAULT_DURATION,
}) => {
  // Clear any existing timeout
  if (toast.timeout) {
    clearTimeout(toast.timeout);
  }

  // Update toast state
  Object.assign(toast, {
    visible: true,
    type,
    title,
    message,
    actionText,
    actionCallback,
  });

  // Set timeout to hide the toast
  if (duration > 0) {
    toast.timeout = setTimeout(() => {
      hideToast();
    }, duration);
  }
};

/**
 * Hide the toast notification
 */
export const hideToast = () => {
  toast.visible = false;

  if (toast.timeout) {
    clearTimeout(toast.timeout);
    toast.timeout = null;
  }
};

/**
 * Handle the action button click
 */
export const handleToastAction = () => {
  if (toast.actionCallback) {
    toast.actionCallback();
  }
  hideToast();
};

// Convenience methods for different toast types
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

// Export the toast state and methods
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
