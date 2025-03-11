import { findUnprocessedThumbnails, markThumbnailAsProcessed } from './core/thumbnailFinder';
import { extractVideoIdFromThumbnail } from './core/videoIdExtractor';
import { observeDomChanges } from './core/domObserver';
import { processVideosForIndicators } from './core/indicatorManager';
import { VideoRegistry, createInitialState, createFetchedState } from '../../types/difficulty';
import { VideoBaseData } from '../../types';
import { mockFetchVideosData } from '../../services/api';

const videoRegistry: VideoRegistry = {};

/**
 * Initializes the difficulty display feature
 */
export function initDifficultyDisplay(): void {
  console.log('Initializing difficulty display feature');

  processNewThumbnails();
  observeDomChanges(processNewThumbnails);

  // Listen for page navigation events
  window.addEventListener('yt-navigate-finish', () => {
    console.log('YouTube navigation detected, processing new thumbnails');
    processNewThumbnails();
  });
}

/**
 * Main processing pipeline for thumbnails:
 * 1. Find unprocessed thumbnails
 * 2. Extract video IDs
 * 3. Update registry
 * 4. Fetch videos data
 */
function processNewThumbnails(): void {
  const newVideoIds = findAndRegisterNewVideos();

  if (newVideoIds.length > 0) {
    fetchVideosDataForVideos(newVideoIds);
  }
}

/**
 * Finds unprocessed thumbnails and registers their video IDs
 * @returns Array of newly found video IDs
 */
function findAndRegisterNewVideos(): string[] {
  const thumbnails = findUnprocessedThumbnails();
  const newVideoIds: string[] = [];

  thumbnails.forEach(thumbnail => {
    const videoId = extractVideoIdFromThumbnail(thumbnail);

    if (!videoId) return;

    if (!videoRegistry[videoId]) {
      videoRegistry[videoId] = createInitialState(videoId);
      newVideoIds.push(videoId);
    }

    markThumbnailAsProcessed(thumbnail);
  });

  if (newVideoIds.length > 0) {
    console.log(`Found ${newVideoIds.length} new videos:`, newVideoIds);
  }

  return newVideoIds;
}

/**
 * Fetches videos data for a list of video IDs
 */
async function fetchVideosDataForVideos(videoIds: string[]): Promise<void> {
  try {
    console.log(`Fetching videos data for ${videoIds.length} videos`);

    const response = await mockFetchVideosData(videoIds);

    if (!response.success || !response.data) {
      console.error('Failed to fetch videos data:', response.error);
      return;
    }

    updateRegistryWithVideosData(response.data);
    await processVideosForIndicators(videoRegistry);
  } catch (error) {
    console.error('Error fetching videos data:', error);
  }
}

/**
 * Updates the video registry with videos data from the API
 */
function updateRegistryWithVideosData(videos: VideoBaseData[]): void {
  videos.forEach(video => {
    if (videoRegistry[video.videoId]) {
      videoRegistry[video.videoId] = createFetchedState(video.videoId, video);
    }
  });

  console.log('Updated video registry with videos data:', videos);
}
