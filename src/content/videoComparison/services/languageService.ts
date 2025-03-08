import { ApiResponse } from '../../../types/api';
import { DifficultyData } from '../../../types/difficulty';
import { API_BASE_URL, API_ENDPOINTS, fetchWithRetry } from '../../../services/api';

export interface VideoLanguageResponse {
  videoId: string;
  difficulty: DifficultyData;
}

export async function fetchVideoLanguage(
  videoId: string
): Promise<ApiResponse<VideoLanguageResponse>> {
  if (!videoId) {
    return {
      success: false,
      error: {
        code: 'INVALID_VIDEO_ID',
        message: 'Video ID is required'
      }
    };
  }

  const url = `${API_BASE_URL}${API_ENDPOINTS.VIDEO_LANGUAGE}/${videoId}`;

  return fetchWithRetry<VideoLanguageResponse>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
