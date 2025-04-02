import { THUMBNAIL_SELECTORS } from '../constants/urlPatterns';

/**
 * Finds all thumbnails on the page
 */
export function findThumbnails(): HTMLElement[] {
  const combinedSelector = THUMBNAIL_SELECTORS.join(', ');
  return Array.from(document.querySelectorAll<HTMLElement>(combinedSelector));
}

export function markThumbnailWithIndicator(element: HTMLElement): void {
  element.setAttribute('data-difficulty-indicator', 'true');
}
