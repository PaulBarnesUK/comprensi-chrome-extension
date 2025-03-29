import { ApiResponse } from '../../../types/api';
import { API_RETRY_ATTEMPTS, API_RETRY_DELAY } from '../constants';

const RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];

export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit,
  retryAttempts = API_RETRY_ATTEMPTS,
  retryDelay = API_RETRY_DELAY
): Promise<ApiResponse<T>> {
  let lastError: Error | null = null;
  let lastStatus: number | null = null;

  for (let attempt = 0; attempt <= retryAttempts; attempt++) {
    try {
      const response = await fetch(url, options);
      lastStatus = response.status;

      if (!response.ok) {
        const shouldRetry = RETRYABLE_STATUS_CODES.includes(response.status);
        if (!shouldRetry) {
          return createErrorResponse(response.status, response.statusText);
        }

        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data as ApiResponse<T>;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      const isRetryable =
        attempt < retryAttempts &&
        (lastStatus === null || RETRYABLE_STATUS_CODES.includes(lastStatus));

      if (isRetryable) {
        await sleep(retryDelay * Math.pow(2, attempt));
      } else {
        break;
      }
    }
  }

  return createErrorResponse(
    lastStatus,
    lastError?.message || 'Request failed after multiple attempts'
  );
}

function createErrorResponse(status: number | null, message: string): ApiResponse<any> {
  return {
    success: false,
    error: {
      code: status ? `HTTP_${status}` : 'REQUEST_FAILED',
      message
    }
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
