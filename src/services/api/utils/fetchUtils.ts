import { ApiResponse } from '../../../types/api';
import { API_RETRY_ATTEMPTS, API_RETRY_DELAY } from '../constants';

export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit,
  retryAttempts = API_RETRY_ATTEMPTS,
  retryDelay = API_RETRY_DELAY
): Promise<ApiResponse<T>> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retryAttempts; attempt++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data as ApiResponse<T>;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < retryAttempts) {
        const delay = retryDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  return {
    success: false,
    error: {
      code: 'REQUEST_FAILED',
      message: lastError?.message || 'Request failed after multiple attempts'
    }
  };
}
