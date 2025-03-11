import { VideoBaseData, VideoFullData } from '../../types';
import { ApiResponse } from '../../types/api';
import { API_BASE_URL, API_ENDPOINTS } from './constants';
import { fetchWithRetry } from './utils/fetchUtils';

/**
 * Fetches video data from the API
 * @param videoId The YouTube video ID
 * @returns Promise resolving to video data
 */
export async function fetchVideoData(videoId: string): Promise<ApiResponse<VideoFullData>> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.VIDEO}/${videoId}`;

  return fetchWithRetry<VideoFullData>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

/**
 * Fetches video data for multiple videos from the API
 * @param videoIds Array of YouTube video IDs
 * @returns Promise resolving to video data
 */
export async function fetchVideosData(videoIds: string[]): Promise<ApiResponse<VideoBaseData[]>> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.VIDEOS}`;

  return fetchWithRetry<VideoBaseData[]>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ videoIds })
  });
}
