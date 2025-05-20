import { VideoFullData } from '@/types';
import { extractVideoId } from './url';
import { fetchVideoData } from '@/services/api/videoService';
import { getWatchedVideo } from '@/utils/storage';

/**
 * Fetches video data from the API and merges with local watch data
 * @returns Promise resolving to video data or null if unavailable
 */
export async function getVideoData(): Promise<VideoFullData | null> {
  try {
    const videoId = extractVideoId(window.location.href);
    if (!videoId) return null;

    const [response, localWatchData] = await Promise.all([
      fetchVideoData(videoId),
      getWatchedVideo(videoId)
    ]);

    if (!response.success || !response.data) {
      console.error('Failed to fetch video data:', response.error);
      return null;
    }

    if (localWatchData?.language?.primary) {
      response.data.language = localWatchData.language;
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching video data:', error);
    return null;
  }
}
