// Background service worker for YouTube Video Difficulty Rater
console.log('Background service worker initialized');

// Listen for installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Initialize storage with default settings
        chrome.storage.local.set({
            watchedVideos: [],
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

// Message handling will be implemented here
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Message handling logic will be added as we implement features
    console.log(message, sender)
    sendResponse({ received: true });
    return true; // Required for async response
}); 