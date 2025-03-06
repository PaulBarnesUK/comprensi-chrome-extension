import { findUnprocessedThumbnails, markThumbnailAsProcessed } from './core/thumbnailFinder';
import { extractVideoIdFromThumbnail } from './core/videoIdExtractor';
import { observeDomChanges } from './core/domObserver';
import { VideoRegistry } from '../../types/difficulty';

const videoRegistry: VideoRegistry = {};

/**
 * Initializes the difficulty display feature
 */
export function initDifficultyDisplay(): void {
  console.log('Initializing difficulty display feature');
  
  // Initial scan for thumbnails
  scanPageForThumbnails();
  
  // Set up observer for DOM changes
  observeDomChanges(scanPageForThumbnails);
  
  // Listen for page navigation events
  window.addEventListener('yt-navigate-finish', () => {
    console.log('YouTube navigation detected, scanning for new thumbnails');
    scanPageForThumbnails();
  });
}

/**
 * Scans the page for thumbnails and extracts video IDs
 */
function scanPageForThumbnails(): void {
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

  console.log(videoRegistry);
  
  if (newVideoIds.length > 0) {
    console.log(`Found ${newVideoIds.length} new videos:`, newVideoIds);
    // In the next chunk, we'll implement API fetching here
  }
} 