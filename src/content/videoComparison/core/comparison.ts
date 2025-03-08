import { WatchData } from '../../../types';
import { comparisonManager } from './modalManager';
import { findEligibleComparisonVideo } from './languageCheck';

export async function getRecentWatchedVideos(): Promise<WatchData[]> {
  try {
    const result = await chrome.storage.local.get(['watchedVideos']);
    const watchedVideos = result.watchedVideos || {};

    return Object.values(watchedVideos as Record<string, WatchData>)
      .filter((video: WatchData) => video.watched)
      .sort((a: WatchData, b: WatchData) => b.lastWatched - a.lastWatched);
  } catch (error) {
    console.error('Error fetching watched videos:', error);
    return [];
  }
}

export async function shouldShowComparison(currentVideoId: string): Promise<WatchData | null> {
  try {
    const recentVideos = await getRecentWatchedVideos();
    return findEligibleComparisonVideo(recentVideos, currentVideoId);
  } catch (error) {
    console.error('Error determining if comparison should be shown:', error);
    return null;
  }
}

export async function handleVideoEnd(currentVideo: WatchData): Promise<void> {
  if (!currentVideo) return;

  const previousVideo = await shouldShowComparison(currentVideo.videoId);

  if (previousVideo) {
    showComparisonModal(currentVideo, previousVideo);
  }
}

function showComparisonModal(currentVideo: WatchData, previousVideo: WatchData): void {
  comparisonManager.showModal({
    currentVideo,
    previousVideo,
    onCompare: (result: 'current' | 'previous' | 'equal') => {
      sendComparisonResult(currentVideo.videoId, previousVideo.videoId, result);
    }
  });
}

function sendComparisonResult(
  currentVideoId: string,
  previousVideoId: string,
  result: 'current' | 'previous' | 'equal'
): void {
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
