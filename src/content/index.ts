// Content script for YouTube Video Difficulty Rater
import { initVideoWatchDetector } from './videoWatcher';

console.log('Content script initialized');

initVideoWatchDetector();

// This will be expanded to handle:
// 1. Video watch detection - IMPLEMENTED
// 2. Difficulty indicator injection
// 3. Comparison UI
// 4. DOM observation for dynamic content

// Send initialization message to background script
chrome.runtime.sendMessage({ type: 'CONTENT_SCRIPT_LOADED' }, (response) => {
  console.log('Background script response:', response);
}); 