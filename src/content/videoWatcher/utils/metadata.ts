import { VideoFullData } from '@/types';
import { extractVideoId } from './url';
import { mockFetchVideoData } from '@/services/api';

/**
 * Fetches video data from the API
 * @param videoElement Optional video element (not used with API approach)
 * @returns Promise resolving to video data or null if unavailable
 */
export async function getVideoData(): Promise<VideoFullData | null> {
  try {
    const videoId = extractVideoId(window.location.href);

    if (!videoId) return null;

    // Use mock service for now - will be replaced with real API when available
    // To switch to real API, replace mockFetchVideoData with fetchVideoData
    const response = await mockFetchVideoData(videoId);

    if (!response.success || !response.data) {
      console.error('Failed to fetch video data:', response.error);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching video data:', error);
    return null;
  }
}
