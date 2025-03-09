import { VideoMetadata } from '@/types';
import { extractVideoId } from './url';
import { mockFetchVideoMetadata } from '@/services/api';

/**
 * Fetches video metadata from the API
 * @param videoElement Optional video element (not used with API approach)
 * @returns Promise resolving to video metadata or null if unavailable
 */
export async function getVideoMetadata(): Promise<VideoMetadata | null> {
  try {
    const videoId = extractVideoId(window.location.href);

    if (!videoId) return null;

    // Use mock service for now - will be replaced with real API when available
    // To switch to real API, replace mockFetchVideoMetadata with fetchVideoMetadata
    const response = await mockFetchVideoMetadata(videoId);

    if (!response.success || !response.data) {
      console.error('Failed to fetch video metadata:', response.error);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    return null;
  }
}
