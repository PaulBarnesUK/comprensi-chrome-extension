import { Message, WatchData, isVideoWatchedMessage } from '../types';
import { saveWatchedVideo, getSettings } from '../utils/storage';

console.log('Background service worker initialized');

chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install') {
    chrome.storage.local.set({
      watchedVideos: {},
      settings: {
        settings: {
          minimumWatchPercentage: 70, // percentage of video that must be watched
          minimumWatchTimeSeconds: 30, // absolute minimum time in seconds
          maximumWatchTimeSeconds: 900, // cap at 15 minutes, ignore watch percentage at this point
        },
      },
    });

    chrome.storage.sync.set({
      selectedLanguages: [],
    });
  }
});

/**
 * Handles storing a watched video and determining if it meets the watch threshold criteria
 * A video is considered "watched" if:
 * 1. The watch time exceeds the maximum threshold (e.g., 15 minutes)
 * OR
 * 2. Both minimum conditions are met:
 *    - Watch time is at least the minimum seconds (e.g., 30 seconds)
 *    - Watch percentage is at least the minimum percentage (e.g., 70%)
 * @returns The updated watch data with the watched property set
 */
async function handleVideoWatched(watchData: WatchData): Promise<WatchData> {
  try {
    const settings = await getSettings();

    const isWatched = 
      watchData.watchTimeSeconds >= settings.maximumWatchTimeSeconds ||
      (watchData.watchTimeSeconds >= settings.minimumWatchTimeSeconds &&
       watchData.watchPercentage >= settings.minimumWatchPercentage);
       
    watchData.watched = isWatched;
    
    await saveWatchedVideo(watchData);
    console.log('Saved watch data for video:', watchData.videoId, 'Watched:', isWatched);
    
    return watchData;
  } catch (error) {
    console.error('Error storing watch data:', error);
    throw error;
  }
}

chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  console.log('Received message:', message.type, sender.tab?.url);

  if (isVideoWatchedMessage(message)) {
    handleVideoWatched(message.data)
      .then((updatedWatchData) => sendResponse({ 
        success: true,
        watchData: updatedWatchData
      }))
      .catch(error => {
        console.error('Error handling video watched:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }

  // Handle other message types
  if (message.type === 'CONTENT_SCRIPT_LOADED') {
    sendResponse({ status: 'Background script acknowledged content script' });
    return;
  }

  // Default response for unhandled message types
  sendResponse({ status: 'Unknown message type' });
});
