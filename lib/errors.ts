/**
 * Error handling utilities
 */

/**
 * Format API error message
 */
export function formatErrorMessage(error: any): string {
  // Axios error with response
  if (error.response) {
    return error.response.data?.message || error.response.data?.error || 'An error occurred';
  }

  // Axios error without response (network error)
  if (error.request) {
    return 'Network error. Please check your connection.';
  }

  // Custom error object
  if (error.message) {
    return error.message;
  }

  // Unknown error
  return 'An unexpected error occurred';
}

/**
 * Format validation errors from API
 */
export function formatValidationErrors(error: any): Record<string, string> {
  if (error.response?.data?.errors) {
    return error.response.data.errors;
  }

  if (error.response?.data?.validationErrors) {
    return error.response.data.validationErrors;
  }

  return {};
}

/**
 * Check if error is authentication error
 */
export function isAuthError(error: any): boolean {
  return error.response?.status === 401 || error.status === 401;
}

/**
 * Check if error is permission error
 */
export function isPermissionError(error: any): boolean {
  return error.response?.status === 403 || error.status === 403;
}

/**
 * Check if error is not found error
 */
export function isNotFoundError(error: any): boolean {
  return error.response?.status === 404 || error.status === 404;
}

/**
 * Check if error is validation error
 */
export function isValidationError(error: any): boolean {
  return error.response?.status === 422 || error.status === 422;
}

/**
 * Check if error is network error
 */
export function isNetworkError(error: any): boolean {
  return !error.response && !!error.request;
}

/**
 * Get error status code
 */
export function getErrorStatus(error: any): number {
  return error.response?.status || error.status || 0;
}

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  public statusCode: number;
  public data?: any;

  constructor(message: string, statusCode = 500, data?: any) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Log error to console or external service
 */
export function logError(error: any, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error${context ? ` - ${context}` : ''}]:`, error);
  }

  // In production, you could send errors to a service like Sentry
  // if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  //   Sentry.captureException(error);
  // }
}

