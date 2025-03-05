// Popup script for YouTube Video Difficulty Rater
console.log('Popup initialized');

// This will be expanded to handle:
// 1. Language selection UI
// 2. Settings management
// 3. Stats display
// 4. User preferences

document.addEventListener('DOMContentLoaded', async () => {
  // Load user settings
  const { settings } = await chrome.storage.local.get(['settings']);
  const { selectedLanguages } = await chrome.storage.sync.get(['selectedLanguages']);

  console.log('Current settings:', { selectedLanguages, settings });
});
