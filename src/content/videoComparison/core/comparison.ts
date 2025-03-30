import { WatchData } from '../../../types';
import { comparisonManager } from './modalManager';
import { findEligibleComparisonVideo } from './languageCheck';
import { sendComparisonResult } from '../../../services/api/videoService';
import { ComparisonResult } from '@/types/api';

const comparisonsShownThisSession = new Set<string>();

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
    if (comparisonsShownThisSession.has(currentVideoId)) return null;

    const recentVideos = await getRecentWatchedVideos();
    return findEligibleComparisonVideo(recentVideos, currentVideoId);
  } catch (error) {
    console.error('Error determining if comparison should be shown:', error);
    return null;
  }
}

export async function checkForComparisonOpportunity(currentVideo: WatchData): Promise<void> {
  if (!currentVideo || !currentVideo.watched) return;

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
  comparisonsShownThisSession.add(currentVideo.id);
}

async function updateComparisonRecord(videoId1: string, videoId2: string): Promise<void> {
  try {
    const result = await chrome.storage.local.get(['watchedVideos']);
    const watchedVideos = result.watchedVideos || {};

    if (watchedVideos[videoId1]) {
      watchedVideos[videoId1].comparedWith = [
        ...(watchedVideos[videoId1].comparedWith || []),
        videoId2
      ];
    }

    if (watchedVideos[videoId2]) {
      watchedVideos[videoId2].comparedWith = [
        ...(watchedVideos[videoId2].comparedWith || []),
        videoId1
      ];
    }

    await chrome.storage.local.set({ watchedVideos });
  } catch (error) {
    console.error('Error updating comparison record:', error);
  }
}

function handleCompare(
  currentVideoId: string,
  previousVideoId: string,
  result: ComparisonResult
): void {
  sendComparisonResult(currentVideoId, previousVideoId, result)
    .then(async response => {
      await updateComparisonRecord(currentVideoId, previousVideoId);

      return response;
    })
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
