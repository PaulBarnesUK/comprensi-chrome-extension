// Content script for YouTube Video Difficulty Rater
import { initVideoWatchDetector } from './videoWatcher';
import './videoComparison';
import { initDifficultyDisplay } from './difficultyDisplay';

console.log('Content script initialized');

initVideoWatchDetector();
initDifficultyDisplay(); // Initialize difficulty display feature

// This will be expanded to handle:
// 1. Video watch detection - IMPLEMENTED
// 2. Difficulty indicator injection - IN PROGRESS
// 3. Comparison UI - IMPLEMENTED
// 4. DOM observation for dynamic content

// Send initialization message to background script
chrome.runtime.sendMessage({ type: 'CONTENT_SCRIPT_LOADED' }, response => {
  console.log('Background script response:', response);
});
