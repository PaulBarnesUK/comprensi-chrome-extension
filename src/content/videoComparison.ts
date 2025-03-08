import { WatchData } from '../types';
import { comparisonManager } from './comparisonModalManager';

/**
 * Fetches the most recently watched videos from storage
 * @returns Promise with an array of watched videos sorted by lastWatched (most recent first)
 */
export async function getRecentWatchedVideos(): Promise<WatchData[]> {
  try {
    const result = await chrome.storage.local.get(['watchedVideos']);
    const watchedVideos = result.watchedVideos || {};

    // Convert to array and sort by lastWatched (most recent first)
    return Object.values(watchedVideos as Record<string, WatchData>)
      .filter((video: WatchData) => video.watched)
      .sort((a: WatchData, b: WatchData) => b.lastWatched - a.lastWatched);
  } catch (error) {
    console.error('Error fetching watched videos:', error);
    return [];
  }
}

/**
 * Checks if a comparison should be shown for the current video
 * @param currentVideoId The ID of the current video
 * @returns Promise with the previous video to compare with, or null if no comparison should be shown
 */
export async function shouldShowComparison(currentVideoId: string): Promise<WatchData | null> {
  try {
    const recentVideos = await getRecentWatchedVideos();

    // If we have fewer than 2 watched videos, don't show comparison
    if (recentVideos.length < 2) {
      return null;
    }

    // Find the current video in the list
    const currentVideoIndex = recentVideos.findIndex(video => video.videoId === currentVideoId);

    // If current video is not found or is not the most recent, don't compare
    if (currentVideoIndex === -1 || currentVideoIndex > 0) {
      return null;
    }

    // Return the second most recent video for comparison
    return recentVideos[1] || null;
  } catch (error) {
    console.error('Error determining if comparison should be shown:', error);
    return null;
  }
}

/**
 * Handles the video end event and shows comparison modal if appropriate
 * @param currentVideo The current video that just ended
 */
export async function handleVideoEnd(currentVideo: WatchData): Promise<void> {
  if (!currentVideo) return;

  const previousVideo = await shouldShowComparison(currentVideo.videoId);

  if (previousVideo) {
    showComparisonModal(currentVideo, previousVideo);
  }
}

/**
 * Shows the comparison modal with the given videos
 * @param currentVideo The current video
 * @param previousVideo The previous video to compare with
 */
function showComparisonModal(currentVideo: WatchData, previousVideo: WatchData): void {
  comparisonManager.showModal({
    currentVideo,
    previousVideo,
    onCompare: (result: 'current' | 'previous' | 'equal') => {
      sendComparisonResult(currentVideo.videoId, previousVideo.videoId, result);
    }
  });
}

/**
 * Sends the comparison result to the backend
 * @param currentVideoId The ID of the current video
 * @param previousVideoId The ID of the previous video
 * @param result The comparison result ('current', 'previous', or 'equal')
 */
function sendComparisonResult(
  currentVideoId: string,
  previousVideoId: string,
  result: 'current' | 'previous' | 'equal'
): void {
  // This will be implemented to send the result to the backend API
  console.log('Comparison result:', {
    currentVideoId,
    previousVideoId,
    result
  });

  // In a real implementation, this would send the data to an API endpoint
  // Example:
  // fetch('https://api.example.com/comparisons', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     currentVideoId,
  //     previousVideoId,
  //     result
  //   })
  // });
}
