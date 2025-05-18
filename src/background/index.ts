import {
  Message,
  WatchData,
  isVideoWatchedMessage,
  isGetSelectedLanguagesMessage,
  isSaveSelectedLanguagesMessage,
  isSelectAllLanguagesMessage,
  isDeselectAllLanguagesMessage
} from '../types';
import {
  saveWatchedVideo,
  getSettings,
  getSelectedLanguages,
  saveSelectedLanguages,
  getWatchedVideo,
  getLanguageStats,
  saveLanguageStats
} from '../utils/storage';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../utils/languages';

const DAILY_RESET_ALARM = 'dailyReset';
const WEEKLY_RESET_ALARM = 'weeklyReset';

console.log('Background service worker initialized');

chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install') {
    chrome.storage.local.set({
      watchedVideos: {},
      languageStats: {},
      settings: {
        settings: {
          minimumWatchPercentage: 70, // percentage of video that must be watched
          minimumWatchTimeSeconds: 30, // absolute minimum time in seconds
          maximumWatchTimeSeconds: 900 // cap at 15 minutes, ignore watch percentage at this point
        }
      }
    });

    chrome.storage.sync.set({
      selectedLanguages: [DEFAULT_LANGUAGE]
    });

    scheduleAlarms();
  }
});
chrome.alarms.onAlarm.addListener(handleAlarm);

function getMidnightTomorrow(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

function getNextMondayMidnight(): Date {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;

  const nextMonday = new Date(currentDate);
  nextMonday.setDate(currentDate.getDate() + daysUntilMonday);
  nextMonday.setHours(0, 0, 0, 0);

  return nextMonday;
}

function scheduleAlarms(): void {
  const tomorrowMidnight = getMidnightTomorrow();
  const nextMondayMidnight = getNextMondayMidnight();

  console.log('Scheduling alarms for:', tomorrowMidnight, nextMondayMidnight);

  chrome.alarms.create(DAILY_RESET_ALARM, {
    when: tomorrowMidnight.getTime(),
    periodInMinutes: 24 * 60
  });

  chrome.alarms.create(WEEKLY_RESET_ALARM, {
    when: nextMondayMidnight.getTime(),
    periodInMinutes: 7 * 24 * 60
  });

  console.log('Daily and weekly reset alarms scheduled.');
}

/**
 * Handles resetting aggregate stats based on alarm triggers
 */
async function handleAlarm(alarm: chrome.alarms.Alarm): Promise<void> {
  console.log('Alarm triggered:', alarm.name);
  const currentStats = await getLanguageStats();
  let statsChanged = false;

  if (alarm.name === DAILY_RESET_ALARM) {
    for (const lang in currentStats) {
      if (currentStats[lang].dailyWatchTimeSeconds > 0) {
        currentStats[lang].dailyWatchTimeSeconds = 0;
        statsChanged = true;
      }
    }
    console.log('Daily stats reset.');
  }

  if (alarm.name === WEEKLY_RESET_ALARM) {
    for (const lang in currentStats) {
      if (currentStats[lang].weeklyWatchTimeSeconds > 0) {
        currentStats[lang].weeklyWatchTimeSeconds = 0;
        statsChanged = true;
      }
    }
    console.log('Weekly stats reset.');
  }

  if (statsChanged) {
    await saveLanguageStats(currentStats);
    console.log('Updated language stats saved after reset.');
  }
}

/**
 * Updates the language stats with new watch time for a specific language
 */
async function updateLanguageStats(languageCode: string, watchTimeDelta: number): Promise<void> {
  if (watchTimeDelta <= 0) return;

  const currentStats = await getLanguageStats();
  const langStats = currentStats[languageCode] || {
    dailyWatchTimeSeconds: 0,
    weeklyWatchTimeSeconds: 0,
    totalWatchTimeSeconds: 0
  };

  langStats.dailyWatchTimeSeconds += watchTimeDelta;
  langStats.weeklyWatchTimeSeconds += watchTimeDelta;
  langStats.totalWatchTimeSeconds += watchTimeDelta;

  currentStats[languageCode] = langStats;
  await saveLanguageStats(currentStats);
}

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
    const previousWatchData = await getWatchedVideo(watchData.id);
    const selectedLanguages = await getSelectedLanguages();

    // Calculate the new watch time delta
    const previousWatchTimeSeconds = previousWatchData?.watchTimeSeconds || 0;
    const watchTimeDelta = watchData.watchTimeSeconds - previousWatchTimeSeconds;

    // Update language stats if this is a selected language and we have new watch time
    if (
      watchData.language?.primary &&
      selectedLanguages.includes(watchData.language.primary) &&
      watchTimeDelta > 0
    ) {
      await updateLanguageStats(watchData.language.primary, watchTimeDelta);
    }

    const isWatched =
      watchData.watchTimeSeconds >= settings.maximumWatchTimeSeconds ||
      (watchData.watchTimeSeconds >= settings.minimumWatchTimeSeconds &&
        watchData.watchPercentage >= settings.minimumWatchPercentage);

    watchData.watched = isWatched;
    watchData.lastWatched = Date.now();

    await saveWatchedVideo(watchData);
    console.log('Saved watch data for video:', watchData.id, 'Watched:', isWatched);

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
      .then(updatedWatchData =>
        sendResponse({
          success: true,
          watchData: updatedWatchData
        })
      )
      .catch(error => {
        console.error('Error handling video watched:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }

  if (isGetSelectedLanguagesMessage(message)) {
    getSelectedLanguages()
      .then(languages =>
        sendResponse({
          success: true,
          languages
        })
      )
      .catch(error => {
        console.error('Error getting selected languages:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }

  if (isSaveSelectedLanguagesMessage(message)) {
    saveSelectedLanguages(message.data.languages)
      .then(() =>
        sendResponse({
          success: true
        })
      )
      .catch(error => {
        console.error('Error saving selected languages:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }

  if (isSelectAllLanguagesMessage(message)) {
    const allLanguageCodes = SUPPORTED_LANGUAGES.map(lang => lang.code);
    saveSelectedLanguages(allLanguageCodes)
      .then(() =>
        sendResponse({
          success: true,
          languages: allLanguageCodes
        })
      )
      .catch(error => {
        console.error('Error selecting all languages:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }

  if (isDeselectAllLanguagesMessage(message)) {
    saveSelectedLanguages([])
      .then(() =>
        sendResponse({
          success: true,
          languages: []
        })
      )
      .catch(error => {
        console.error('Error deselecting all languages:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});
