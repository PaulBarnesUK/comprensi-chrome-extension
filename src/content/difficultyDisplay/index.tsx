import { findUnprocessedThumbnails, markThumbnailAsProcessed } from './core/thumbnailFinder';
import { extractVideoIdFromThumbnail } from './core/videoIdExtractor';
import { observeDomChanges } from './core/domObserver';
import { mockFetchDifficultyData } from './core/mockApiClient';
import { processVideosForIndicators } from './core/indicatorManager';
import { VideoRegistry, DifficultyData } from '../../types/difficulty';

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
 * 4. Fetch difficulty data
 */
function processNewThumbnails(): void {
  const newVideoIds = findAndRegisterNewVideos();
  
  if (newVideoIds.length > 0) {
    fetchDifficultyDataForVideos(newVideoIds);
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
      videoRegistry[videoId] = { videoId };
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
 * Fetches difficulty data for a list of video IDs
 */
async function fetchDifficultyDataForVideos(videoIds: string[]): Promise<void> {
  try {
    console.log(`Fetching difficulty data for ${videoIds.length} videos`);
    
    const response = await mockFetchDifficultyData(videoIds);
    
    if (!response.success || !response.data) {
      console.error('Failed to fetch difficulty data:', response.error);
      return;
    }
    
    updateRegistryWithDifficultyData(response.data.videos);
    processVideosForIndicators(videoRegistry);
  } catch (error) {
    console.error('Error fetching difficulty data:', error);
  }
}

/**
 * Updates the video registry with difficulty data from the API
 */
function updateRegistryWithDifficultyData(videos: Record<string, DifficultyData | null>): void {
  Object.entries(videos).forEach(([videoId, difficultyData]) => {
    if (videoRegistry[videoId] && difficultyData !== null) {
      videoRegistry[videoId].difficulty = difficultyData;
    }
  });
  
  console.log('Updated video registry with difficulty data:', videos);
} 