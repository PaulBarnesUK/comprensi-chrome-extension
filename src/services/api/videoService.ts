import { VideoMetadata } from '../../types';
import { ApiResponse } from '../../types/api';
import { API_BASE_URL, API_ENDPOINTS } from './constants';
import { fetchWithRetry } from './utils/fetchUtils';

/**
 * Fetches video metadata from the API
 * @param videoId The YouTube video ID
 * @returns Promise resolving to video metadata
 */
export async function fetchVideoMetadata(videoId: string): Promise<ApiResponse<VideoMetadata>> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.VIDEO}/${videoId}`;

  return fetchWithRetry<VideoMetadata>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
