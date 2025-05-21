import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { DifficultyIndicator } from '../../../components/DifficultyIndicator';
import { VideoFullData } from '../../../types';
import { getTitleElement } from '../../videoWatcher/selectors';
import { getSelectedLanguages } from '../../../utils/messaging';

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

export async function appendDifficultyIndicatorToTitle(videoData: VideoFullData): Promise<void> {
  const titleElement = getTitleElement();
  if (!titleElement) return;

  removeDifficultyIndicatorFromTitle();

  const indicator = document.createElement('span');
  indicator.id = INDICATOR_ID;

  titleElement.appendChild(indicator);

  const selectedLanguages = await getSelectedLanguages();
  const videoLang = videoData.language?.primary;
  const showScore = videoLang ? selectedLanguages.includes(videoLang) : false;

  indicatorRoot = createRoot(indicator);
  indicatorRoot.render(
    React.createElement(DifficultyIndicator, {
      score:
        videoData.difficulty.confidence > 0.5 || videoData.bypassSigmaCheck
          ? videoData.difficulty?.score
          : undefined,
      language: videoLang,
      showScore
    })
  );
}
