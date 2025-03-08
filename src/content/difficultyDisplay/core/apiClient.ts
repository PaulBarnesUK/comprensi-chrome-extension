import { ApiResponse, DifficultyResponse } from '../../../types/api';
import { API_BASE_URL, API_ENDPOINTS, fetchWithRetry } from '../../../services/api';

export async function fetchDifficultyData(
  videoIds: string[]
): Promise<ApiResponse<DifficultyResponse>> {
  if (!videoIds.length) {
    return {
      success: true,
      data: { videos: {} }
    };
  }

  const url = `${API_BASE_URL}${API_ENDPOINTS.DIFFICULTY}`;

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ videoIds })
  };

  return fetchWithRetry<DifficultyResponse>(url, options);
}
