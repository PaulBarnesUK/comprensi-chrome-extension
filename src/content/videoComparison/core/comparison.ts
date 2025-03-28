import { WatchData } from '../../../types';
import { comparisonManager } from './modalManager';
import { findEligibleComparisonVideo } from './languageCheck';
import { sendComparisonResult } from '../../../services/api/videoService';
import { ComparisonResult } from '@/types/api';

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

  const previousVideo = await shouldShowComparison(currentVideo.id);

  if (previousVideo) {
    showComparisonModal(currentVideo, previousVideo);
  }
}

function showComparisonModal(currentVideo: WatchData, previousVideo: WatchData): void {
  comparisonManager.showModal({
    currentVideo,
    previousVideo,
    onCompare: (result: ComparisonResult) => {
      handleCompare(currentVideo.id, previousVideo.id, result);
    }
  });
}

function handleCompare(
  currentVideoId: string,
  previousVideoId: string,
  result: ComparisonResult
): void {
  sendComparisonResult(currentVideoId, previousVideoId, result)
    .then(response => {
      if (response.success) {
        console.log('Comparison result sent successfully:', response.data);
      } else {
        console.error('Failed to send comparison result:', response.error);
      }
    })
    .catch(error => {
      console.error('Error sending comparison result:', error);
    });
}
