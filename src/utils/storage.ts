import { StorageSchema, WatchData } from '../types';
import { DEFAULT_LANGUAGE } from './languages';

export async function getWatchedVideo(videoId: string): Promise<WatchData | null> {
  try {
    const result = (await chrome.storage.local.get(['watchedVideos'])) as Partial<StorageSchema>;
    return (result.watchedVideos && result.watchedVideos[videoId]) || null;
  } catch (error) {
    console.error('Error getting watched video:', error);
    return null;
  }
}

export async function saveWatchedVideo(watchData: WatchData): Promise<void> {
  try {
    const result = (await chrome.storage.local.get(['watchedVideos'])) as Partial<StorageSchema>;
    const watchedVideos = result.watchedVideos || {};

    watchedVideos[watchData.id] = watchData;
    await chrome.storage.local.set({ watchedVideos });
  } catch (error) {
    console.error('Error saving watched video:', error);
    throw error;
  }
}

export async function clearWatchedVideos(): Promise<void> {
  try {
    await chrome.storage.local.set({ watchedVideos: {} });
  } catch (error) {
    console.error('Error clearing watched videos:', error);
    throw error;
  }
}

export async function getSettings(): Promise<StorageSchema['settings']['settings']> {
  try {
    const result = (await chrome.storage.local.get(['settings'])) as Partial<StorageSchema>;
    return result.settings?.settings || getDefaultSettings();
  } catch (error) {
    console.error('Error getting settings:', error);
    return getDefaultSettings();
  }
}

function getDefaultSettings(): StorageSchema['settings']['settings'] {
  return {
    minimumWatchPercentage: 70,
    minimumWatchTimeSeconds: 30,
    maximumWatchTimeSeconds: 900
  };
}

/**
 * Gets the user's selected languages from storage
 * @returns Array of language codes that are selected
 */
export async function getSelectedLanguages(): Promise<string[]> {
  try {
    const result = await chrome.storage.sync.get(['selectedLanguages']);
    return result.selectedLanguages || [DEFAULT_LANGUAGE];
  } catch (error) {
    console.error('Error getting selected languages:', error);
    return [DEFAULT_LANGUAGE];
  }
}

/**
 * Saves the user's selected languages to storage
 * @param languages Array of language codes to save
 */
export async function saveSelectedLanguages(languages: string[]): Promise<void> {
  try {
    await chrome.storage.sync.set({ selectedLanguages: languages });
  } catch (error) {
    console.error('Error saving selected languages:', error);
    throw error;
  }
}
