// Background service worker for YouTube Video Difficulty Rater
import { Message, WatchData, isVideoWatchedMessage } from '../types';
import { saveWatchedVideo } from '../utils/storage';

console.log('Background service worker initialized');

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        chrome.storage.local.set({
            watchedVideos: {},
            settings: {
                settings: {
                    minimumWatchPercentage: 70, // percentage of video that must be watched
                    minimumWatchTimeSeconds: 30, // absolute minimum time in seconds
                    maximumWatchTimeSeconds: 900, // cap at 15 minutes, ignore watch percentage at this point
                }
            }
        });

        chrome.storage.sync.set({
            selectedLanguages: []
        });
    }
});

/**
 * Handles storing a watched video
 */
async function handleVideoWatched(watchData: WatchData): Promise<void> {
    try {
        await saveWatchedVideo(watchData);
        console.log('Saved watch data for video:', watchData.videoId);
    } catch (error) {
        console.error('Error storing watch data:', error);
        throw error;
    }
}

chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
    console.log('Received message:', message.type, sender.tab?.url);
    
    if (isVideoWatchedMessage(message)) {
        handleVideoWatched(message.data)
            .then(() => sendResponse({ success: true }))
            .catch(error => {
                console.error('Error handling video watched:', error);
                sendResponse({ success: false, error: error.message });
            });
        return true;
    }
    
    sendResponse({ received: true });
    return true;
});