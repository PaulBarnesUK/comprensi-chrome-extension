import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { DifficultyIndicator } from '../../../components/DifficultyIndicator';
import { VideoFullData } from '../../../types';
import { getSelectedLanguages, sendMessage } from '../../../utils/messaging';
import { waitForElement } from '../../videoWatcher/utils/domObserver';
import { API_BASE_URL, API_ENDPOINTS } from '@/services/api/constants';
import { fetchWithRetry } from '@/services/api/utils/fetchUtils';

const INDICATOR_ID = 'comprensi-difficulty-indicator';
let indicatorRoot: Root | null = null;

export function removeDifficultyIndicatorFromTitle(): void {
  const existing = document.getElementById(INDICATOR_ID);
  if (existing) {
    if (indicatorRoot) {
      indicatorRoot.unmount();
      indicatorRoot = null;
    }
    existing.remove();
  }
}

async function updateVideoLanguage(videoId: string, newLanguage: string): Promise<void> {
  await sendMessage({
    type: 'UPDATE_VIDEO_LANGUAGE',
    data: {
      videoId,
      newLanguage
    }
  });

  const response = await fetchWithRetry(`${API_BASE_URL}${API_ENDPOINTS.VIDEO}/${videoId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language: { primary: newLanguage } })
  });

  if (!response.success) {
    throw new Error(response.error?.message || 'Failed to update video language');
  }
}

export async function appendDifficultyIndicatorToTitle(videoData: VideoFullData): Promise<void> {
  waitForElement<HTMLElement>('h1.ytd-watch-metadata', async titleElement => {
    if (!titleElement) return;

    removeDifficultyIndicatorFromTitle();

    const indicator = document.createElement('span');
    indicator.id = INDICATOR_ID;

    titleElement.appendChild(indicator);

    const selectedLanguages = await getSelectedLanguages();
    const videoLang = videoData.language?.primary;
    const showScore = videoLang ? selectedLanguages.includes(videoLang) : false;

    async function handleLanguageChange(newLanguage: string) {
      if (!videoData.id) return;
      try {
        await updateVideoLanguage(videoData.id, newLanguage);
        appendDifficultyIndicatorToTitle({
          ...videoData,
          language: { primary: newLanguage, full: newLanguage }
        });
      } catch (error) {
        console.error('Error updating video language:', error);
      }
    }

    indicatorRoot = createRoot(indicator);
    indicatorRoot.render(
      React.createElement(DifficultyIndicator, {
        score:
          videoData.difficulty.confidence > 0.5 || videoData.bypassSigmaCheck
            ? videoData.difficulty?.score
            : undefined,
        language: videoLang,
        showScore,
        onLanguageChange: handleLanguageChange
      })
    );
  });
}
