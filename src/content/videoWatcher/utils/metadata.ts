import { VideoFullData } from '@/types';
import { extractVideoId } from './url';
import { fetchVideoData } from '@/services/api/videoService';

/**
 * Fetches video data from the API
 * @param videoElement Optional video element (not used with API approach)
 * @returns Promise resolving to video data or null if unavailable
 */
export async function getVideoData(): Promise<VideoFullData | null> {
  try {
    const videoId = extractVideoId(window.location.href);

    if (!videoId) return null;

    const response = await fetchVideoData(videoId);

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
