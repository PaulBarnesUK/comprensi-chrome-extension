import { extractVideoIdFromUrl } from './urlParser';

export function extractVideoIdFromAnchor(anchor: HTMLAnchorElement): string | null {
  const href = anchor.getAttribute('href');
  if (!href) return null;
  
  return extractVideoIdFromUrl(`https://youtube.com${href}`);
}

export function extractVideoIdFromDataAttribute(element: HTMLElement): string | null {
  const img = element.querySelector('img[data-ytid]');
  return img?.getAttribute('data-ytid') || null;
}

export function findAnchorInParents(element: HTMLElement): HTMLAnchorElement | null {
  let current = element;
  
  while (current.parentElement) {
    current = current.parentElement;
    if (current.tagName === 'A') {
      return current as HTMLAnchorElement;
    }
  }
  
  return null;
} 