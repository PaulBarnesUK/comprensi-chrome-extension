import { findThumbnails } from './core/thumbnailFinder';
import { extractVideoIdFromThumbnail } from './core/videoIdExtractor';
import { observeDomChanges } from './core/domObserver';
import { processVideosForIndicators } from './core/indicatorManager';
import { VideoRegistry, createInitialState, createFetchedState } from './types';
import { VideoFullData } from '../../types';
import { fetchVideosData } from '../../services/api/videoService';
import { cleanAllIndicators } from './core/indicatorInjector';

let videoRegistry: VideoRegistry = {};

/**
 * Initializes the difficulty display feature
 */
export function initDifficultyDisplay(): void {
  console.log('Initializing difficulty display feature');

  processNewThumbnails();
  observeDomChanges(processNewThumbnails);

  // Listen for page navigation events
  window.addEventListener('yt-navigate-finish', () => {
    console.log('YouTube navigation detected, resetting state');

    cleanAllIndicators();
    resetVideoRegistry();
  });
}

/**
 * Resets the video registry
 * This is our source of truth for what has been processed
 */
function resetVideoRegistry(): void {
  videoRegistry = {};
}

/**
 * Main processing pipeline for thumbnails:
 * 1. Find thumbnails and extract video IDs
 * 2. Filter for videos not in registry
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
 * Finds thumbnails and registers their video IDs if not already in registry
 * Uses the registry as the source of truth instead of DOM attributes
 * @returns Array of newly found video IDs
 */
function findAndRegisterNewVideos(): string[] {
  const thumbnails = findThumbnails();
  const newVideoIds: string[] = [];

  thumbnails.forEach((thumbnail: HTMLElement) => {
    const videoId = extractVideoIdFromThumbnail(thumbnail);

    if (!videoId) return;

    if (!videoRegistry[videoId]) {
      videoRegistry[videoId] = createInitialState(videoId);
      newVideoIds.push(videoId);
    }
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

    const response = await fetchVideosData(videoIds);

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
function updateRegistryWithVideosData(videos: VideoFullData[]): void {
  videos.forEach(video => {
    if (videoRegistry[video.id]) {
      videoRegistry[video.id] = createFetchedState(video.id, video);
    }
  });

  console.log('Updated video registry with videos data:', videos);
}
