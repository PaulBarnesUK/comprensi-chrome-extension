/**
 * Utility functions for messaging with the background script
 */

/**
 * Sends a message to the background script and returns a promise with the response
 */
export async function sendMessage<T>(message: any): Promise<T> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      
      if (response && response.success === false) {
        reject(new Error(response.error || 'Unknown error'));
        return;
      }
      
      resolve(response as T);
    });
  });
}

/**
 * Gets the user's selected languages from the background script
 */
export async function getSelectedLanguages(): Promise<string[]> {
  try {
    const response = await sendMessage<{ languages: string[] }>({
      type: 'GET_SELECTED_LANGUAGES'
    });
    return response.languages;
  } catch (error) {
    console.error('Error getting selected languages:', error);
    throw error;
  }
}

/**
 * Saves the user's selected languages via the background script
 */
export async function saveSelectedLanguages(languages: string[]): Promise<void> {
  try {
    await sendMessage({
      type: 'SAVE_SELECTED_LANGUAGES',
      data: { languages }
    });
  } catch (error) {
    console.error('Error saving selected languages:', error);
    throw error;
  }
}

/**
 * Selects all available languages via the background script
 */
export async function selectAllLanguages(): Promise<string[]> {
  try {
    const response = await sendMessage<{ languages: string[] }>({
      type: 'SELECT_ALL_LANGUAGES'
    });
    return response.languages;
  } catch (error) {
    console.error('Error selecting all languages:', error);
    throw error;
  }
}

/**
 * Deselects all languages via the background script
 */
export async function deselectAllLanguages(): Promise<string[]> {
  try {
    const response = await sendMessage<{ languages: string[] }>({
      type: 'DESELECT_ALL_LANGUAGES'
    });
    return response.languages;
  } catch (error) {
    console.error('Error deselecting all languages:', error);
    throw error;
  }
} 