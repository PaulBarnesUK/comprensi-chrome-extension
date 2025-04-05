import { WatchData } from '../../../types';
import { comparisonManager } from './modalManager';
import { findEligibleComparisonVideo } from './languageCheck';
import { sendComparisonResult } from '../../../services/api/videoService';
import { ApiResponse, CompareResponse, ComparisonResult } from '@/types/api';
import { getWatchedVideo, saveWatchedVideo } from '../../../utils/storage';

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
      return handleCompare(currentVideo.id, previousVideo.id, result);
    }
  });
}

async function updateComparisonRecord(videoId1: string, videoId2: string): Promise<void> {
  try {
    const video1 = await getWatchedVideo(videoId1);
    const video2 = await getWatchedVideo(videoId2);

    if (video1 && !video1.comparedWith?.includes(videoId2)) {
      video1.comparedWith = [...(video1.comparedWith || []), videoId2];
      await saveWatchedVideo(video1);
    }

    if (video2 && !video2.comparedWith?.includes(videoId1)) {
      video2.comparedWith = [...(video2.comparedWith || []), videoId1];
      await saveWatchedVideo(video2);
    }
  } catch (error) {
    console.error('Error updating comparison record:', error);
  }
}

async function handleCompare(
  currentVideoId: string,
  previousVideoId: string,
  result: ComparisonResult
): Promise<ApiResponse<CompareResponse>> {
  try {
    const response = await sendComparisonResult(currentVideoId, previousVideoId, result);

    if (response.success) {
      await updateComparisonRecord(currentVideoId, previousVideoId);
      comparisonsShownThisSession.add(currentVideoId);
      console.log('Comparison result sent successfully:', response.data);
    } else {
      console.error('Failed to send comparison result:', response.error);
    }

    return response;
  } catch (error) {
    console.error('Error sending comparison result:', error);
    return {
      success: false,
      error: {
        code: 'COMPARISON_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    };
  }
}
