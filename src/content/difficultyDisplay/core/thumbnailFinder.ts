import { THUMBNAIL_SELECTORS } from '../constants/urlPatterns';

export function findUnprocessedThumbnails(): HTMLElement[] {
  const combinedSelector = THUMBNAIL_SELECTORS.join(', ');
  const elements = Array.from(document.querySelectorAll<HTMLElement>(combinedSelector));
  
  return elements.filter(el => !el.hasAttribute('data-difficulty-processed'));
}

export function markThumbnailAsProcessed(element: HTMLElement): void {
  element.setAttribute('data-difficulty-processed', 'true');
}

export function markThumbnailWithIndicator(element: HTMLElement): void {
  element.setAttribute('data-difficulty-indicator', 'true');
} 