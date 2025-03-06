import { extractVideoIdFromAnchor, extractVideoIdFromDataAttribute, findAnchorInParents } from '../utils/elementParser';

export function extractVideoIdFromThumbnail(element: HTMLElement): string | null {
  if (element.tagName === 'A') {
    return extractVideoIdFromAnchor(element as HTMLAnchorElement);
  }

  const anchor = element.querySelector('a');
  if (anchor) {
    return extractVideoIdFromAnchor(anchor);
  }
  
  const dataId = extractVideoIdFromDataAttribute(element);
  if (dataId) {
    return dataId;
  }
  
  const parentAnchor = findAnchorInParents(element);
  if (parentAnchor) {
    return extractVideoIdFromAnchor(parentAnchor);
  }
  
  return null;
} 