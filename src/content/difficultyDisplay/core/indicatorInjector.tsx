import React from 'react';
import { createRoot } from 'react-dom/client';
import { DifficultyData } from '../../../types/difficulty';
import { DifficultyIndicator } from '../../../components/DifficultyIndicator';

// Confidence threshold for displaying indicators
const CONFIDENCE_THRESHOLD = 10;

export function findThumbnailsForVideoId(videoId: string): HTMLElement[] {
  const selector = `
    a#thumbnail[href*="${videoId}"]:not([data-difficulty-indicator="true"]),
    ytd-thumbnail a[href*="${videoId}"]:not([data-difficulty-indicator="true"]),
    .ytd-thumbnail-overlay-toggle-button-renderer[href*="${videoId}"]:not([data-difficulty-indicator="true"])
  `;
  return Array.from(document.querySelectorAll<HTMLElement>(selector));
}

export function shouldDisplayIndicator(difficultyData: DifficultyData): boolean {
  return difficultyData.sigma < CONFIDENCE_THRESHOLD;
}

export function createIndicatorContainer(thumbnail: HTMLElement): HTMLDivElement | null {
  const parent = thumbnail.parentElement;
  if (!parent) return null;
  
  const container = document.createElement('div');
  
  parent.insertBefore(container, thumbnail);
  container.appendChild(thumbnail);
  
  return container;
}

export function renderIndicator(mountPoint: HTMLElement, difficultyData: DifficultyData): void {
  const root = createRoot(mountPoint);
  root.render(
    React.createElement(DifficultyIndicator, {
      score: difficultyData.score,
      language: difficultyData.language
    })
  );
}

export function markThumbnailWithIndicator(thumbnail: HTMLElement): void {
  thumbnail.setAttribute('data-difficulty-indicator', 'true');
}

export function injectIndicator(thumbnail: HTMLElement, difficultyData: DifficultyData): void {
  const container = createIndicatorContainer(thumbnail);
  if (!container) return;
  
  const mountPoint = document.createElement('div');
  container.appendChild(mountPoint);

  renderIndicator(mountPoint, difficultyData);
  markThumbnailWithIndicator(thumbnail);
}