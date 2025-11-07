import { toast as sonnerToast } from 'sonner';

/**
 * Toast notification utilities
 * Wrapper around sonner for consistent toast notifications
 */

export const toast = {
  /**
   * Show success toast
   */
  success: (message: string, options?: any) => {
    return sonnerToast.success(message, {
      duration: 3000,
      ...options,
    });
  },

  /**
   * Show error toast
   */
  error: (message: string, options?: any) => {
    return sonnerToast.error(message, {
      duration: 5000,
      ...options,
    });
  },

  /**
   * Show info toast
   */
  info: (message: string, options?: any) => {
    return sonnerToast.info(message, {
      duration: 3000,
      ...options,
    });
  },

  /**
   * Show warning toast
   */
  warning: (message: string, options?: any) => {
    return sonnerToast.warning(message, {
      duration: 4000,
      ...options,
    });
  },

  /**
   * Show loading toast
   */
  loading: (message: string, options?: any) => {
    return sonnerToast.loading(message, options);
  },

  /**
   * Show promise toast (automatically shows loading, success, or error)
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: any
  ) => {
    return sonnerToast.promise(promise, { ...messages, ...options });
  },

  /**
   * Dismiss specific toast
   */
  dismiss: (toastId?: string | number) => {
    return sonnerToast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    return sonnerToast.dismiss();
  },
};

/**
 * Toast notification with custom styling
 */
export function showCustomToast(
  type: 'success' | 'error' | 'info' | 'warning',
  title: string,
  description?: string
) {
  return toast[type](title, {
    description,
  });
}

/**
 * Show confirmation dialog using toast
 */
export function showConfirmToast(
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) {
  return sonnerToast(message, {
    action: {
      label: 'Confirm',
      onClick: onConfirm,
    },
    cancel: {
      label: 'Cancel',
      onClick: onCancel || (() => {}),
    },
    duration: 10000,
  });
}

