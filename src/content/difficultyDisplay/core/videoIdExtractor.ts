import { extractVideoIdFromAnchor, extractVideoIdFromDataAttribute, findAnchorInParents } from '../utils/elementParser';

export function extractVideoIdFromThumbnail(element: HTMLElement): string | null {
  // Check if element is an anchor
  if (element.tagName === 'A') {
    return extractVideoIdFromAnchor(element as HTMLAnchorElement);
  }
  
  // Check for anchor inside element
  const anchor = element.querySelector('a');
  if (anchor) {
    return extractVideoIdFromAnchor(anchor);
  }
  
  // Check for data attribute
  const dataId = extractVideoIdFromDataAttribute(element);
  if (dataId) {
    return dataId;
  }
  
  // Check parent elements
  const parentAnchor = findAnchorInParents(element);
  if (parentAnchor) {
    return extractVideoIdFromAnchor(parentAnchor);
  }
  
  return null;
} 